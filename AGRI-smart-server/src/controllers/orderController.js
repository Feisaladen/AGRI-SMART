const Order = require('../order')
const Farm = require('../farm')
const User = require('../user')
const Product = require('../product')

const getFarmOrders = async (req, res) => {
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
        const productIds = farmProducts.map(p => p._id)

        const orders = await Order.find({ product: { $in: productIds } })
            .populate('product') 
            .populate('buyer')
            .sort({ createdAt: -1 })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getFarmOrders, updateOrderStatus }
