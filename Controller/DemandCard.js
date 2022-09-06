
const DemandCard = require("../model/DemandCard");

//CREATE

exports.create = async (req, res) => {
  if (!req.body.email && !req.body.entreprise && !req.body.photo && !req.body.adresse && !req.body.nbrecard && !req.body.qrcode) {
      res.status(400).send({ message: "Content can not be empty!" });
  }
  
const QR = require('qrcode-base64')
var qrcodegenerated = QR.drawImg(req.body.email+req.body.nbrecard, {
  typeNumber: 4,
  errorCorrectLevel: 'M',
  size: 500
})
req.body.qrcode = qrcodegenerated;
  
  const demandCard = new DemandCard({

      email: req.body.email,
      entreprise: req.body.entreprise,
      photo: req.body.photo,
      adresse: req.body.adresse,
      nbrecard: req.body.nbrecard,
      qrcode:req.body.qrcode
  });
  
  await demandCard.save().then(data => {
      res.send({
          message:"DemandCart created successfully!!",
          demandCard:data
      });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating DemandCart"
      });
  });
};

//
