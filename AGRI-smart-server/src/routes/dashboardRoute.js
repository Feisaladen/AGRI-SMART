const express = require('express')
const router = express.Router()
const { getFarmerDashboard } = require('../controllers/dashboardController')

router.get('/farmer/:clerkId', getFarmerDashboard)

module.exports = router
