const express = require('express')
const router = express.Router()
const { getAllProducts } = require('../controllers/marketplaceController')

router.get('/', getAllProducts)

module.exports = router
