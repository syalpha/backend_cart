const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        default: ''
    },
    createDate: {
        type: Date,
        default: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    addresse: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    poste: {
        type: String,
        default: ''
    },
    workAdd: {
        type: String,
        default: ''
    },
    entreprisename: {
        type: String,
        default: ''
    },
});

const user = new mongoose.model('User', Userschema);

module.exports = user;