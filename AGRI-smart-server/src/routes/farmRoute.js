const express = require('express')
const router = express.Router()
const { createFarm } = require('../controllers/farmController')

router.post('/create', createFarm)

module.exports = router