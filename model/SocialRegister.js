const mongoose = require('mongoose');

const SocialRegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    photoUrl: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('SocialRegister', SocialRegisterSchema);