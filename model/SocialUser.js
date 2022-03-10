const mongoose = require('mongoose');

const SocialUserSchema = new mongoose.Schema({

    googleId: {
        type: String,
        require: true
    },

    displayName: {
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
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('SocialUser', SocialUserSchema)