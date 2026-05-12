const express = require('express')
const router = express.Router()
const { createBuyerOrder, getBuyersOrders } = require('../controllers/buyerOrderController')

router.post('/', createBuyerOrder)
router.get('/:clerkId', getBuyersOrders)

module.exports = router
