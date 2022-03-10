const router = require("express").Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const passport = require("passport");


dotenv.config();


/////////////////////////////////REGISTER/////////////////////////////////////

router.post("/register", async(req, res) => {

    // Our register logic starts here
    try {
        // Get admin input
        const { username, email, password, isAdmin } = req.body;

        // Validate admin input
        if (!(email && password && username && isAdmin)) {
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
            process.env.TOKEN_SECRET, {
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
});


/////////////////////////LOGIN/////////////////////////////////////////////

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

            var token = jwt.sign({ id: admin.id, isAdmin: admin.isAdmin }, process.env.TOKEN_SECRET, {
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


//@desc Auth with Google
//@route GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@desc  Google Callback
//@route GET /auth/google/callback

router.get('/auth/google/callback', passport.authenticate('google'
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