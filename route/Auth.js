const express = require('express');
const server = express();
const router = require("express").Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const passport = require("passport");
const cors = require('cors')

dotenv.config();

var corsOptions = {
    origin: "http://cart-ud.usinedigitale.org/",
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'Content-Type', 'Authorization'
    ],

};

//server.use(cors(corsOptions));
/////////////////////////////////REGISTER/////////////////////////////////////


/*router.post("/register", async(req, res) => {

    // Our register logic starts here
    try {
        // Get admin input
        const { username, email, password, isAdmin } = req.body;

        // Validate admin input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }

        // check if admin already exist
        // Validate if admin exist in our database
        const oldUser = await Admin.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt admin password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create admin in our database
        const admin = await Admin.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            isAdmin
        });

        // Create token
        const token = jwt.sign({ admin_id: admin._id, email, isAdmin: admin.isAdmin },
            process.env.secret, {
                expiresIn: "2h",
            }
        );
        // save admin token
        admin.token = token;

        // return new admin
        res.status(201).json(admin);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});*/

router.post('/register', async(req, res) => {
    let admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin
    })
    admin = await admin.save();

    if (!admin)
        return res.status(400).send('the user cannot be created!')

    res.send(admin);
})


/////////////////////////LOGIN/////////////////////////////////////////////
/*
router.post("/login", async(req, res) => {
    Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(admin => {
            if (!admin) {
                return res.status(404).send({ message: "admin Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                admin.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: admin.id, isAdmin: admin.isAdmin }, process.env.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: admin.id,
                isAdmin: admin.isAdmin,
                email: admin.email,
                password: admin.password,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});
*/


router.post('/login', async(req, res) => {
        const admin = await Admin.findOne({ email: req.body.email })
        const secret = process.env.secret;
        if (!admin) {
            return res.status(400).send('The user not found');
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: admin.id, isAdmin: admin.isAdmin }, process.env.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: admin.id,
            isAdmin: admin.isAdmin,
            email: admin.email,
            password: admin.password,
            accessToken: token
        });

        /* if (admin && bcrypt.compareSync(req.body.password, admin.passwordHash)) {
             const token = jwt.sign({
                     id: admin.id,
                     isAdmin: admin.isAdmin
                 },
                 secret, { expiresIn: '1d' }
             )

             res.status(200).send({ admin: admin.email, token: token })
         } else {
             res.status(400).send('password is wrong!');
         }
         */

    })
    //@desc Auth with Google
    //@route GET /auth/google

router.get('/google', cors(corsOptions), passport.authenticate('google', { scope: ['profile'] }));

//@desc  Google Callback
//@route GET /auth/google/callback

router.get('/auth/google/callback', cors(corsOptions), passport.authenticate('google'
    //, { failureRedirect: '/error', successRedirect: '/dash' }
));

/*
router.get('/dash', (res, req) => {
    res.send('Hello')
})

router.get('/error', (res, req) => {
    res.send('Hello loy def fi')
})
*/
module.exports = router;