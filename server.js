const express = require("express")
const mongoose = require("mongoose")
const server = express()
const User = require('./model/User')
const Auth = require('./route/Auth')
const bodyParser = require('body-parser')
const UserRoute = require('./route/User')
const ProductRoute = require('./route/Product')
const OrderRoute = require('./route/Order')
const CartRoute = require('./route/Cart')
const Paydunya = require('./route/Paydounya')
const DesignYourCartRoute = require('./route/DesignYourCard')
const cors = require("cors");   

var corsOptions = {
    origin: "http://localhost:4200"
};

server.use(cors(corsOptions));


server.use(bodyParser.urlencoded({ extended: true }))

server.use(bodyParser.json({ extended: true }))


//Routes

server.use('/user', UserRoute)
server.use('/product', ProductRoute)
server.use('/order', OrderRoute)
server.use('/cart', CartRoute)
server.use(express.json())
server.use('/api', Auth)
server.use('/design',DesignYourCartRoute)
server.use('/app.paydunya.com/sandbox-api/',Paydunya)
server.use(function (req, res, next) {
    req.socket.on("error", function () {

    });
    res.socket.on("error", function () {

    });
    next();
});


mongoose
    .connect("mongodb://localhost/backen_cart",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

server.listen(5000, () => { console.log("Server started: 5000") })