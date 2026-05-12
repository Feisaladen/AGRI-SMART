const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema ({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    
 
    },
    name: {
        type: String,
        required: true,

    },
    county : {
        type: String,
        required: true,
    },
    crops : {
        type: [String],
        required: true,

    }
}, { timestamps: true})
module.exports = mongoose.model('farm', farmSchema)