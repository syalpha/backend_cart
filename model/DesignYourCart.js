const mongoose = require('mongoose');

const DesignYourCartSchema = new mongoose.Schema({

    image:{
        type: String,
        required: false,
    },
    prenom:{
        type: String,
        required: false,
    },
    nom:{
        type: String,
        required: false,
    },
    entreprise:{
        type: String,
        required: false,
    },
    poste:{
        type: String,
        required: false,
    },
    birthday:{
        type: Date,
        required: false,
    },
    numHome:{
        type: String,
        required: false,
    },
    numOffice:{
        type: String,
        required: false,
    },
    numCell:{
        type: String,
        required: false,
    },
    numOfficeFax:{
        type: String,
        required: false,
    },
    email1:{
        type: String,
        required: false,
    },
    email2:{
        type: String,
        required: false,
    },
    paypal:{
        type:String,
        require: false
    },
    web1:{
        type:String,
        require:false
    },
    web2:{
        type:String,
        require:false
    },
    rue:{
        type:String,
        require:false
    },
    ville:{
        type:String,
        require:false
    },
    station:{
        type:String,
        require:false
    },
    pays:{
        type:String,
        require:false
    },
    backgroundCouleur:{
        type:String,
        require:false
    },
    couleurText:{
        type:String,
        require:false
    },
    couleurSurligner:{
        type:String,
        require:false
    }
})
module.exports = mongoose.model("DesignYourCart", DesignYourCartSchema);