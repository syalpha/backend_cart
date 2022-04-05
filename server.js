const express = require("express");
const mongoose = require("mongoose");
const server = express();
const User = require("./model/User");
const Auth = require("./route/Auth");
const bodyParser = require("body-parser");
const UserRoute = require("./route/User");
const ProductRoute = require("./route/Product");
const OrderRoute = require("./route/Order");
const CartRoute = require("./route/Cart");
const DesignYourCartRoute = require("./route/DesignYourCart");
const Paydunya = require("./route/Paydunya");
const CustomerRouter = require("./route/Customer");
const SocialRegister = require("./route/SocialRegister");
const Vcard = require("./route/Vcard")
    //passport import
var passport = require("passport");

//import session
const session = require('express-session');

//passport config
require('./Config/passport')(passport)

//require('./config')

var cors = require("cors");
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
        '*'
    ],
};

server.use(cors(corsOptions));


/*server.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-type, Accept, Authorization');

    /*if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/
//session middleware
server.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))
    //passport middleware

server.use(passport.initialize())
server.use(passport.session())




server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.json({ extended: true }));

//Routes

server.use("/user", UserRoute);
server.use("/product", ProductRoute);
server.use("/order", OrderRoute);
server.use("/cart", CartRoute);
server.use("/design", DesignYourCartRoute);
server.use("/paydunya", Paydunya);
server.use(express.json());
server.use("/api", Auth);
server.use("/app", Vcard);
server.use("/customer", CustomerRouter);
server.use("/apiSocial", SocialRegister)
server.use(function(req, res, next) {
    req.socket.on("error", function() {});
    res.socket.on("error", function() {});
    next();
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
const db = mongoose.connection;

db.on("error", (err) => {
    console.error(err);
});
db.once("open", () => {
    console.log("DB started successfully");
});

server.listen(PORT, () => {
    console.log("Server started: 5000");
});

//git push heroku HEAD:master