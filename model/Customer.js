const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    adresse: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Customer", CustomerSchema);