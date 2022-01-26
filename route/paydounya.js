
const paydunya = require('paydunya');

const setup = new paydunya.Setup({
  masterKey: 'X7BAbgUo-lZ7X-mwUh-jZxS-Tshr5mrcM6wM',
  privateKey: 'test_private_GYqtXS57coENYdPwHR4vGEGeQNE',
  publicKey: 'test_public_vZAcHHaGaLu3kmkyguAnHkW7GRc',
  token: 'rJAGC0bGkNnnfY9p2aBd',
  mode: 'test', // Optionnel. Utilisez cette option pour les paiements tests.
  cancelURL: 'http://magasin-le-choco.com/cancel_url',
  returnURL: 'http://magasin-le-choco.com/return_url'
});


// Procédez ainsi si vous souhaitez rediriger vos clients vers notre site Web  afin qu'il puisse achever le processus de paiement
// Il est important de remarquer que le constructeur requiert respectivement comme paramètres
// une instance des classes paydunya.Setup et paydunya.Store
const invoice = new paydunya.CheckoutInvoice(setup, store);


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


app.post('/ipn-url', function(req, res) {
    const status = req.body.data.status;
});


app.post('/ipn-url', function(req, res) {
    const amount = req.body.data.invoice.total_amount;
});


app.post('/ipn-url', function(req, res) {
    
    const hash = req.body.data.hash;
});


// Le code suivant décrit comment créer une facture de paiement au niveau de nos serveurs,
// rediriger ensuite le client vers la page de paiement
// et afficher ensuite son reçu de paiement en cas de succès.
invoice.create()
  .then(function (){
    console.log(invoice.status);
    console.log(invoice.token); // Token de facture
    console.log(invoice.responseText);
    console.log(invoice.url); // URL de redirection de paiement de facture PayDunya
  })
  .catch(function (e) {
    console.log(e);
  });


// PayDunya rajoutera automatiquement le token de la facture sous forme de QUERYSTRING "token"
// si vous avez configuré un "return_url" ou "cancel_url".
const token = 'rJAGC0bGkNnnfY9p2aBd';

const invoice = new paydunya.CheckoutInvoice(setup, store);
invoice.confirm(token)
.then(function (){
  // Récupérer le statut du paiement
  // Le statut du paiement peut être soit completed, pending, cancelled
  console.log(invoice.status);

  console.log(invoice.responseText);  // Réponse du serveur

  // Les champs qui suivent seront disponibles si et
  // seulement si le statut du paiement est égal à "completed".

  // Vous pouvez récupérer le nom, l'adresse email et le
  // numéro de téléphone du client en utilisant l'objet suivant
  console.log(invoice.customer); // {name: 'Alioune', phone: '773830274', email: 'aliounebadara@gmail.com'}

  // URL du reçu PDF électronique pour téléchargement
  console.log(invoice.receiptURL); // 'https://app.paydunya.com/sandbox-checkout/receipt/pdf/test_VPGPZNnHOC.pdf'
})
.catch(function (e) {
  console.log(e);
});

