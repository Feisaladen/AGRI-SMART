const Product = require('../product')
const Farm = require('../farm')
const User = require('../user')

const createProduct = async (req, res) => {
    try {
        console.log('Creating product with data:', req.body)
        const { clerkId, name, price, quantity, unit, description, photo } = req.body
        
        const user = await User.findOne({ clerkId })
        if (!user) {
            console.log('User not found for clerkId:', clerkId)
            return res.status(404).json({ message: 'User not found' })
        }
        console.log('User found:', user._id)

        const farm = await Farm.findOne({ owner: user._id })
        if (!farm) {
            console.log('Farm not found for user:', user._id)
            return res.status(404).json({ message: 'Farm not found. Please create a farm profile first.' })
        }
        console.log('Farm found:', farm._id)

        const product = await Product.create({
            farm: farm._id,
            name,
            price,
            quantity,
            unit,
            description,
            photo
        })
        console.log('Product created:', product._id)
        res.status(201).json(product)
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({ message: error.message })
    }
}

const getFarmProducts = async (req, res) => {
    try {
        const { clerkId } = req.params
        const user = await User.findOne({ clerkId })
        const farm = await Farm.findOne({ owner: user._id })
        const products = await Product.find({ farm: farm._id })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const updated = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        )
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        await Product.findByIdAndDelete(productId)
        res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createProduct, getFarmProducts, updateProduct, deleteProduct }
