const router = require("express").Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


dotenv.config();


/////////////////////////////////REGISTER/////////////////////////////////////

router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get admin input
    const { username, email, password } = req.body;

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
    });

    // Create token
    const token = jwt.sign(
      { admin_id: admin._id, admin_email: admin._email },
      process.env.TOKEN_SECRET,
      {
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

router.post("/login", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
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

      // if (!passwordIsValid) {
      //   return res.status(401).send({
      //     accessToken: null,
      //     message: "Invalid Password!"
      //   });
      // }

      var token = jwt.sign({ id: admin.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: admin.id,
        email: admin.email,
        password: admin.password,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;