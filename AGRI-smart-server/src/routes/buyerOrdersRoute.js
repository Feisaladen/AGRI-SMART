const express = require('express')
const router = express.Router()
const { getBuyersOrders } = require('../controllers/buyerOrdersController')

router.get('/:clerkId', getBuyersOrders)

module.exports = router
