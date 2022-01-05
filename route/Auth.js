const router = require("express").Router();
const Admin = require("../model/adminModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newAdmin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  }catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const admin = await Admin.findOne(
            {
                userName: req.body.user_name
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
        process.env.JWT_SEC,
            {expiresIn:"3h"}
        );
  
        const { password, ...others } = admin._doc;  
        res.status(200).json({...others, accessToken});

    } catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;