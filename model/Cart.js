const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
});

module.exports = mongoose.model("Cart", CartSchema);