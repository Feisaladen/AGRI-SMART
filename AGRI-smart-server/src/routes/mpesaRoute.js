const express = require('express')
const router = express.Router()
const { stkPush, callback } = require('../controllers/mpesaController')

router.post('/stk-push', stkPush)
router.post('/callback', callback)

module.exports = router
