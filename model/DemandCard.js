const mongoose = require('mongoose');

const DemandCardSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },

    entreprise: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
        required: true
    },

    adresse: {
        type: String,
        required: true
    },

    qrcode: {
        type: String,
        
    },

    nbrecard: {
        type: Number,
        required: true
    },
    
});

module.exports = mongoose.model("DemandCard", DemandCardSchema);