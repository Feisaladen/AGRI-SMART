const express = require('express')
const router = express.Router()
const {createProduct, getFarmProducts, updateProduct, deleteProduct} = require("../controllers/ProductController")

router.post('/create', createProduct)
router.get('/farm/:clerkId', getFarmProducts)
router.patch('/:productId',  updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router