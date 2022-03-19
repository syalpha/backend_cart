const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },

        desc: {
            type: String,
            required: true,
        },

        img: {
            type: String,
            required: true
        },

        categories: {
            type: Array
        },

        price: {
            type: Number,
            required: true
        },

        qtite: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: false
        },
    },

    { timestamps: true }

);

module.exports = mongoose.model("Product", ProductSchema);