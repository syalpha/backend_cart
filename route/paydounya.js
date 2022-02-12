
const express = require('express')
const app = express();
const paydunya = require('paydunya');

const router = express.Router();

const setup = new paydunya.Setup({
  masterKey: 'X7BAbgUo-lZ7X-mwUh-jZxS-Tshr5mrcM6wM',
  privateKey: 'test_private_GYqtXS57coENYdPwHR4vGEGeQNE',
  publicKey: 'test_public_vZAcHHaGaLu3kmkyguAnHkW7GRc',
  token: 'rJAGC0bGkNnnfY9p2aBd',
  mode: 'test', // Optionnel. Utilisez cette option pour les paiements tests.
  cancelURL: 'http://magasin-le-choco.com/cancel_url',
  returnURL: 'http://magasin-le-choco.com/return_url',
  url: 'https://paydunya.com/checkout/invoice/rJAGC0bGkNnnfY9p2aBd'
});


//auguste.hountondji@paydunya.com

// Procédez ainsi si vous souhaitez rediriger vos clients vers notre site Web  afin qu'il puisse achever le processus de paiement
// Il est important de remarquer que le constructeur requiert respectivement comme paramètres
// une instance des classes paydunya.Setup et paydunya.Store


// Configuration des informations de votre service/entreprise
const store = new paydunya.Store({
  name: 'Usine Digitale', // Seul le nom est requis
  tagline: "L'élégance n'a pas de prix",
  phoneNumber: ' 33 868 13 65',
  postalAddress: 'Almadies lot 106 Résidende Kastelle dakar, 12000',
  websiteURL: 'https://usinedigitale.biz',
  logoURL: 'https://usinedigitale.biz/wp-content/uploads/2019/12/TESTE1.png'
});


const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
router.post('/v1/checkout-invoice/create',(req,res)=>{
  const setup = new paydunya.Setup({
    masterKey: 'X7BAbgUo-lZ7X-mwUh-jZxS-Tshr5mrcM6wM',
    privateKey: 'test_private_GYqtXS57coENYdPwHR4vGEGeQNE',
    publicKey: 'test_public_vZAcHHaGaLu3kmkyguAnHkW7GRc',
    token: 'rJAGC0bGkNnnfY9p2aBd',
    mode: 'test', // Optionnel. Utilisez cette option pour les paiements tests.
    cancelURL: 'http://magasin-le-choco.com/cancel_url',
    returnURL: 'http://magasin-le-choco.com/return_url',
  });
  res.send("ok")


})

module.exports = router;