const express = require('express');
const paydounya = require('paydunya');
const router = express.Router();
const app = express()

const setup = new paydounya.Setup({
  masterKey: 'X7BAbgUo-lZ7X-mwUh-jZxS-Tshr5mrcM6wM',
  privateKey: 'test_private_GYqtXS57coENYdPwHR4vGEGeQNE',
  publicKey: 'test_public_vZAcHHaGaLu3kmkyguAnHkW7GRc',
  token: 'rJAGC0bGkNnnfY9p2aBd',
  callbackURL: 'http://localhost:5000',
  mode: 'test', // Optionnel. Utilisez cette option pour les paiements tests.
  cancelURL: 'http://magasin-le-choco.com/cancel_url',
  returnURL: 'http://magasin-le-choco.com/return_url',
  url: 'https://paydunya.com/checkout/invoice/rJAGC0bGkNnnfY9p2aBd'
});



// Procédez ainsi si vous souhaitez rediriger vos clients vers notre site Web  afin qu'il puisse achever le processus de paiement
// Il est important de remarquer que le constructeur requiert respectivement comme paramètres
// une instance des classes paydunya.Setup et paydunya.Store
//const invoice = new paydunya.CheckoutInvoice(setup, store);


// Configuration des informations de votre service/entreprise
const store = new paydounya.Store({
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

router.post('/pay',(res,req)=>{
  const invoice = new paydounya.CheckoutInvoice(setup, store);
  invoice.addItem('Chaussures Croco', 1, 10000, 30000, 'Chaussures faites en peau de crocrodile authentique qui chasse la pauvreté');
  invoice.addItem('Chemise Glacée', 1, 5000, 5000);
  invoice.description = "Description Optionnelle";
  invoice.totalAmount = 200;
  tk="rJAGC0bGkNnnfY9p2aBd" 
  invoice.create()
  .then(function (){
    console.log(invoice.status);
    console.log(invoice.token);  // Token de facture
    console.log(invoice.responseText);
    console.log(invoice.url); // URL de redirection de paiement de facture PayDunya
  })
  .catch(function (e) {
    console.log(e);
  });
  //res.send('test')
})
module.exports = router;