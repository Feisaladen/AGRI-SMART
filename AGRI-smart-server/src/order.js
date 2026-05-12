const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema ({
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
     buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
     },
      quantity: {
        type: Number,
        required: true
      },
      totalprice: {
        type: Number,
        required: true
      },
       status: {
        type: String,
        enum: ['pending' , 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
       }
}, {timestamps: true})
module.exports = mongoose.model('order', orderSchema)
