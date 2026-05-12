const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farm',
        required: true,
    },
     name: {
        type: String,
        required: true,

     },
     price: {
        type: Number,
        required: true,

     }, 
     quantity: {
        type: Number,
        required: true,
     },
     description: {
        type: String,
        required: false
     },
     photo: {
        type: String,
        required: false
     },
     unit: {
        type: String,
        required: true,
     }, 
     status : {
        type: String,
        enum: ['active', 'paused', 'sold out'],
        default: 'active'
     }
}, {timestamps: true})

module.exports = mongoose.model('product', productSchema)
