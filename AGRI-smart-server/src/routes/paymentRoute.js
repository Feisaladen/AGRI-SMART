const express = require('express')
const router = express.Router()
const { getFarmPayments } = require('../controllers/paymentController')

router.get('/farmer/:clerkId', getFarmPayments)

module.exports = router
