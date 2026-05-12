const Payment = require('../payment')
const Order = require('../order')
const Farm = require('../farm')
const User = require('../user')
const Product = require('../product')

const getFarmPayments = async (req, res) => {
    try {
        const { clerkId } = req.params

        const user = await User.findOne({ clerkId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const farm = await Farm.findOne({ owner: user._id })
        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' })
        }

        const farmProducts = await Product.find({ farm: farm._id })
        const productIds = farmProducts.map(product => product._id)

        const orders = await Order.find({ product: { $in: productIds } })
        const orderIds = orders.map(order => order._id)

        const payments = await Payment.find({ order: { $in: orderIds } })
            .populate({
                path: 'order',
                populate: { path: 'product' }
            })
            .sort({ createdAt: -1 })

        res.status(200).json(payments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 

module.exports = { getFarmPayments }
