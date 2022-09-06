const express = require("express")
const mongoose = require("mongoose")
//const authJwt = require('./helpers/jwt')
const server = express()
const User = require('./model/User')
const Auth = require('./route/Auth')
const bodyParser = require('body-parser')
const UserRoute = require('./route/User')
const ProductRoute = require('./route/Product')
const OrderRoute = require('./route/Order')
const CartRoute = require('./route/Cart')
const paydounya = require('./route/paydounya')
const DemandCardRoute = require('./route/DemandCard')

const cors = require("cors");


const DesignYourCartRoute = require('./route/DesignYourCard')
 


var corsOptions = {
    origin: "http://localhost:4200"
};

server.use(cors(corsOptions));


server.use(bodyParser.urlencoded({ extended: true }))

server.use(bodyParser.json({ extended: true }))

//server.use(authJwt)

//Routes

server.use('/user', UserRoute)
server.use('/demand', DemandCardRoute)
server.use('/product', ProductRoute)
server.use('/order', OrderRoute)
server.use('/cart', CartRoute)
server.use('/paydounya', paydounya)
server.use(express.json())
server.use('/api', Auth)
server.use('/design',DesignYourCartRoute)
server.use('/app.paydunya.com/sandbox-api/',paydounya)
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

