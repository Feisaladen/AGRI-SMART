const express = require('express')
const router = express.Router()
const { getFarmOrders, updateOrderStatus } = require('../controllers/orderController')

router.get('/farm/:clerkId', getFarmOrders)
router.get('/farmer/:clerkId', getFarmOrders)
router.patch('/:orderId', updateOrderStatus)

module.exports = router
