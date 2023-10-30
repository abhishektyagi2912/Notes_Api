const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    }
}, { timestamps: true });

// timestamps: true is used to add the time of creation and updation of the document
module.exports = mongoose.model('User', userSchema);