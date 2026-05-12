const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    clerkId: {
        type: String,
        required: true,
        unique: true

    
    }, 
    role : {
        type: String,
        required: true

    }
}, {timestamps: true}
 


) 
module.exports = mongoose.model('user', userSchema) 