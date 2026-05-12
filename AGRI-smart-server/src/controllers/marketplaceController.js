const Product = require('../product')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'active' })
            .populate({
                path: 'farm',
                select: 'name county'
            })
            .sort({ createdAt: -1 })

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllProducts }
