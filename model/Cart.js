const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    numcart: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        required: true
    },
    
});

module.exports = mongoose.model("Cart", CartSchema);