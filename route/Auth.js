const router = require("express").Router();
const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


dotenv.config();

//REGISTER
// router.post("/register", async (req, res) => {
//   const newAdmin = new Admin({
//     username: req.body.username,
//     email: req.body.email,
//     password: CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString(),
//   });

//   try {
//     const savedAdmin = await newAdmin.save();
//     res.status(201).json(savedAdmin);
//   }catch (err) {
//     res.status(500).json(err);
//   }
// });

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
      { admin_id: admin._id, email },
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

//LOGIN

/*router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne(
      {
        email: req.body.email
      }
    );

    !admin && res.status(401).json("Wrong admin Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      admin.password,
      process.env.PASS_SEC
    );


    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword &&
      res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: admin._id,
        isAdmin: admin.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3h" }
    );

    const { password, ...others } = admin._doc;
    res.status(200).json({ ...others, accessToken });

  } catch (err) {
    res.status(500).json(err);
  }

});*/

router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get admin input
    const { email, password } = req.body;

    // Validate admin input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if admin exist in our database
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Create token
      const token = jwt.sign(
        { admin_id: admin._id, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      // save admin token
      admin.token = token;

      // admin
      res.status(200).json(admin);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;