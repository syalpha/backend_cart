const express = require('express');
const router = express.Router();

//const designYourCart = require('../Controller/DesignYourCart');
const DesignYourCart = require('../model/DesignYourCart');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname;
      cb(null, Date.now() + fileName)
    }
  })
  const uploadOptions = multer({ storage: storage })

router.post('/create',uploadOptions.single('image'),async (req,res)=>{

    const fileName = req.file;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
    const designYourCart = new DesignYourCart({

        image:`${basePath}${fileName}`,
        prenom:req.body.prenom,
        nom:req.body.nom,
        entreprise:req.body.entreprise,
        poste:req.body.poste,
        birthday:req.body.birthday,
        numHome:req.body.numHome,
        numOffice:req.body.numOffice,
        numCell:req.body.numCell,
        numOfficeFax:req.body.numOfficeFax,
        email1:req.body.email1,
        email2:req.body.email2,
        paypal:req.body.paypal,
        web1:req.body.web1,
        web2:req.body.web2,
        rue:req.body.rue,
        ville:req.body.ville,
        station:req.body.station,
        pays:req.body.pays,
        backgroundCouleur:req.body.backgroundCouleur,
        couleurText:req.body.couleurText,
        couleurSurligner:req.body.couleurSurligner

    });
    await designYourCart.save().then(data => {
        res.send({
            message:"Cart created successfully!!",
            designYourCart:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating designYourCart"
        });
    });
});


module.exports = router; 