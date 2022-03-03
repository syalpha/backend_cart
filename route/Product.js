 const Product = require("../model/Product");
 const express = require('express');
 const router = express.Router();

 const {
     verifyToken,
     verifyTokenAndAuthorization,
     verifyTokenAndAdmin,
 } = require("./VerifyToken");

 const ProductController = require('../Controller/Product')

 router.get('/all', ProductController.findAll);
 router.get('/:id', ProductController.findOne);
 router.patch('/:id', ProductController.update);
 router.delete('/:id', ProductController.destroy);

 const multer = require("multer");
 const storage = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, './public/upload/')
     },
     filename: function(req, file, cb) {
         const fileName = file.originalname;
         cb(null, Date.now() + fileName)
     }
 })
 const uploadOptions = multer({ storage: storage })
 router.post('/create', uploadOptions.single('img'), async(req, res) => {

     const fileName = req.file;
     const basePath = `${req.protocol}://${req.get('host')}/public/upload/`

     const product = new Product({
         title: req.body.title,
         desc: req.body.desc,
         img: `${basePath}${fileName}`,
         price: req.body.price,
         qtite: req.body.qtite,

     })
     await product.save().then(data => {
         res.send({
             message: "Cart created successfully!!",
             product: data
         });
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating designYourCart"
         });
     });
 })
 module.exports = router;