const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true

        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        isAdmin: {
            type: Boolean,
            required: false,

        },


        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,

        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);