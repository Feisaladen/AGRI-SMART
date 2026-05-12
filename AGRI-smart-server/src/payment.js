const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema ({
   order : {
     type : mongoose.Schema.Types.ObjectId,
     ref: 'order',
     required: true
   }, 
   amount : {
     type: Number,
     required: true
   },
     status : {
      type : String,
      enum: ['pending', 'completed', 'failed'],
      default : 'pending'
     }
  }, { timestamps:true })
  module.exports = mongoose.model('payment', paymentSchema)