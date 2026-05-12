const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const  userRoute = require('./routes/userRoute')
const farmRoute = require('./routes/farmRoute')
const productRoute = require('../src/routes/productRoutes')
const paymentRoute = require('./routes/paymentRoute')
const orderRoute = require('./routes/orderRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const marketplaceRoute = require('./routes/marketplaceRoute')
const checkoutRoute = require('./routes/checkoutRoute')
const aiRoute = require('./routes/AI-Route')




const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
})

const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 AI requests per minute
    message: 'Too many AI requests, please wait a moment.'
})

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(limiter)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})
app.use('/api/users', userRoute)
app.use('/users', userRoute)
app.use('/api/farms', farmRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/payments', paymentRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/marketplace', marketplaceRoute)
app.use('/api/checkout', checkoutRoute)
app.use('/api/ai', aiLimiter, aiRoute)
  
// connect to the database .... ..... 
mongoose.connect(process.env.MONGO_URI).then(() => console.log('connected to database')).catch(err => console.log('error connecting to database:', err))
app.listen(5000, () => console.log('Server running on port 5000'))
