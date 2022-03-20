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
const Vcard = require("./route/Vcard")
    //passport import
var passport = require("passport");

//import session
const session = require('express-session');

//passport config
require('./Config/passport')(passport)

//require('./config')

const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51KEcipKN0gt4zFdRhEixWzcloryZ0QlYHWhIy9syPWJF8sChb0LIpEj7rRo2byN2xFtxC3W2f2zEaHZLbaXgeIio00mzdNskKH"
);

var corsOptions = {
    origin: "http://localhost:4200",
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

server.use(cors(corsOptions));

/*server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://usine-digitale-vcard.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/

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