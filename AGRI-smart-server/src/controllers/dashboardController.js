const User = require('../user')
const Farm = require('../farm')
const Order = require('../order')
const Payment = require('../payment')
const Product = require('../product')

const getFarmerDashboard = async (req, res) => {
  const { clerkId } = req.params
  try {
    const user = await User.findOne({ clerkId })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const farm = await Farm.findOne({ owner: user._id })
    if (!farm) return res.status(404).json({ message: 'Farm not found' })

    const products = await Product.find({ farm: farm._id })
    const productIds = products.map(p => p._id)

    const orders = await Order.find({ product: { $in: productIds } }).populate('product')
    const orderIds = orders.map(o => o._id)

    const payments = await Payment.find({
      order: { $in: orderIds },
      status: 'completed'
    })
    const totalEarnings = payments.reduce((acc, p) => acc + p.amount, 0)

    res.status(200).json({
      farmName: farm.name,
      county: farm.county,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalEarnings,
      recentOrders: orders.slice(0, 5)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getFarmerDashboard }
