const axios = require('axios')
const Payment = require('../payment')
const Order = require('../order')

const getMpesaConfig = () => {
  const config = {
    consumerKey: process.env.MPESA_CONSUMER_KEY?.trim(),
    consumerSecret: process.env.MPESA_CONSUMER_SECRET?.trim(),
    shortcode: process.env.MPESA_SHORTCODE?.trim(),
    passkey: process.env.MPESA_PASSKEY?.trim(),
    callbackUrl: process.env.MPESA_CALLBACK_URL?.trim()
  }

  const missingFields = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  return { config, missingFields }
}

const formatTimestamp = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

const normalizePhone = (phone = '') => {
  const cleanedPhone = String(phone).replace(/\D/g, '')

  if (cleanedPhone.startsWith('0') && cleanedPhone.length === 10) {
    return `254${cleanedPhone.slice(1)}`
  }

  return cleanedPhone
}

const getAccessToken = async () => {
  const { config, missingFields } = getMpesaConfig()

  if (missingFields.length > 0) {
    const error = new Error(`Missing M-Pesa configuration: ${missingFields.join(', ')}`)
    error.statusCode = 500
    throw error
  }

  const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64')

  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`
      },
      timeout: 15000
    }
  )

  return response.data.access_token
}

const stkPush = async (req, res) => {
  try {
    const { phone, amount, orderId } = req.body
    const normalizedPhone = normalizePhone(phone)
    const numericAmount = Number(amount)

    console.log('[M-PESA][stkPush] Incoming request:', {
      phone,
      normalizedPhone,
      amount,
      numericAmount,
      orderId
    })

    if (!orderId || !normalizedPhone || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      console.log('[M-PESA][stkPush] Validation failed')
      return res.status(400).json({ message: 'phone, amount, and orderId are required' })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      console.log('[M-PESA][stkPush] Order not found:', orderId)
      return res.status(404).json({ message: 'Order not found' })
    }

    const { config, missingFields } = getMpesaConfig()
    if (missingFields.length > 0) {
      console.log('[M-PESA][stkPush] Missing config fields:', missingFields)
      return res.status(500).json({
        message: `Missing M-Pesa configuration: ${missingFields.join(', ')}`
      })
    }

    const token = await getAccessToken()
    const timestamp = formatTimestamp()
    const password = Buffer.from(`${config.shortcode}${config.passkey}${timestamp}`).toString('base64')

    console.log('[M-PESA][stkPush] Sending STK push:', {
      orderId,
      shortcode: config.shortcode,
      callbackUrl: config.callbackUrl,
      phone: normalizedPhone,
      amount: Math.round(numericAmount),
      timestamp
    })

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: config.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(numericAmount),
        PartyA: normalizedPhone,
        PartyB: config.shortcode,
        PhoneNumber: normalizedPhone,
        CallBackURL: config.callbackUrl,
        AccountReference: 'Agri-Smart',
        TransactionDesc: 'Payment for farm produce'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 20000
      }
    )

    await Payment.create({
      order: orderId,
      amount: numericAmount,
      status: 'pending'
    })

    console.log('[M-PESA][stkPush] Safaricom response:', response.data)

    return res.status(200).json(response.data)
  } catch (error) {
    const statusCode = error.statusCode || error.response?.status || 500
    const upstreamMessage =
      error.response?.data?.errorMessage ||
      error.response?.data?.errorMessage?.toString?.() ||
      error.response?.data?.ResponseDescription ||
      error.response?.data?.responseDescription ||
      error.response?.data?.message ||
      error.message

    console.log('[M-PESA][stkPush] Error:', {
      statusCode,
      message: error.message,
      upstreamMessage,
      responseData: error.response?.data || null,
      stack: error.stack
    })

    return res.status(statusCode).json({
      message: upstreamMessage || 'Failed to initiate M-Pesa STK push',
      details: error.response?.data || null
    })
  }
}

const callback = async (req, res) => {
  try {
    const { Body } = req.body
    const { stkCallback } = Body || {}

    console.log('[M-PESA][callback] Payload received:', req.body)

    if (!stkCallback) {
      console.log('[M-PESA][callback] Invalid callback payload')
      return res.status(400).json({ message: 'Invalid callback payload' })
    }

    const resultCode = stkCallback.ResultCode
    const metadata = stkCallback.CallbackMetadata?.Item || []
    const checkoutRequestId = stkCallback.CheckoutRequestID

    if (resultCode === 0) {
      const mpesaRef = metadata.find((item) => item.Name === 'MpesaReceiptNumber')?.Value

      console.log('[M-PESA][callback] Payment successful:', {
        resultCode,
        checkoutRequestId,
        mpesaRef
      })

      const payment = await Payment.findOneAndUpdate(
        { status: 'pending' },
        {
          status: 'completed',
          mpesaRef,
          checkoutRequestId
        },
        { new: true, sort: { createdAt: -1 } }
      )

      if (payment?.order) {
        await Order.findByIdAndUpdate(payment.order, { status: 'confirmed' })
      }

      return res.status(200).json({ message: 'Payment received' })
    }

    console.log('[M-PESA][callback] Payment failed:', {
      resultCode,
      checkoutRequestId,
      metadata
    })

    await Payment.findOneAndUpdate(
      { status: 'pending' },
      { status: 'failed', checkoutRequestId },
      { sort: { createdAt: -1 } }
    )

    return res.status(200).json({ message: 'Payment failed' })
  } catch (error) {
    console.log('[M-PESA][callback] Error:', {
      message: error.message,
      stack: error.stack
    })
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { stkPush, callback }
