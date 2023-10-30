const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, { timestamps: true });

// timestamps: true is used to add the time of creation and updation of the document
module.exports = mongoose.model('Notes', notesSchema);