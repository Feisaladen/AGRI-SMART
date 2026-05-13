const express = require('express')
const router = express.Router()
const { getFarmOrders, updateOrderStatus } = require('../controllers/orderController')
const { createBuyerOrder, getBuyersOrders } = require('../controllers/buyerOrderController')

router.post('/create', createBuyerOrder)
router.get('/buyer/:clerkId', getBuyersOrders)
router.get('/farm/:clerkId', getFarmOrders)
router.get('/farmer/:clerkId', getFarmOrders)
router.patch('/:orderId', updateOrderStatus)

module.exports = router
