const Order = require('../order')
const User = require('../user')

const getBuyersOrders = async (req, res) => {
    try {
        const { clerkId } = req.params

        const buyer = await User.findOne({ clerkId })
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' })
        }

        const orders = await Order.find({ buyer: buyer._id })
            .populate('product')
            .sort({ createdAt: -1 })

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getBuyersOrders }
