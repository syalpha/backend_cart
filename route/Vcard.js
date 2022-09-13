const express = require('express')

const router = express.Router();

const database = [{
    fname: "Yahya",
    lname: "LY",
    phone: "775701631",
    email: "yaya.ly@uadb.edu.sn",
    organisation: "Usine Digitale",
    facebook: "Yahya Ly",
    twitter: "@LYYaya4",
    linked: "Yaya Ly"
}]
router.get('/vcardgenerates', (req, res) => {

    const vcard = require('vcards-js')

    const myCard = vcard()

    myCard.firstName = database[0].fname;
    myCard.lastName = database[0].lname;
    myCard.cellPhone = database[0].phone;
    myCard.email = database[0].email;
    myCard.organisation = database[0].organisation;
    myCard.socialUrls['facebook'] = database[0].facebook;
    myCard.socialUrls['twitter'] = database[0].twitter;
    myCard.socialUrls['linkedIn'] = database[0].linked;

    myCard.saveToFile('./public/vcard/barbaki.vcf')
    console.log(myCard.getFormattedString());
    res.send(myCard.getFormattedString())
})

module.exports = router;