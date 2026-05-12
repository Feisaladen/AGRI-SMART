const express = require('express')
const router = express.Router()
const { chatWithAI } = require('../controllers/AIController')

router.post('/chat', chatWithAI)

module.exports = router