<<<<<<< HEAD
// const Product = require("../model/Product");
// const verifyToken = require("./VerifyToken")

// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("./verifyToken");

// const router = require("express").Router();

// //CREATE

// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//   const newProduct = new Product(req.body);

//   try {
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL PRODUCTS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;

//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");

const ProductController = require('../Controller/Product')

//router.get('/all', ProductController.findAll);
router.get('/:id', ProductController.findOne);

router.post('/create', verifyToken, ProductController.create);
router.patch('/:id',  verifyTokenAndAdmin,ProductController.update);

router.post('/create', ProductController.create);
router.patch('/:id', verifyTokenAndAdmin, ProductController.update);

router.delete('/:id', verifyTokenAndAdmin, ProductController.destroy);

module.exports = router;
=======
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
         totalPrice: req.body.totalPrice

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

 router.get(`/get/count`, async(req, res) => {
     const productCount = await Product.countDocuments()

     if (!productCount) {
         res.status(500).json({ success: false });
     }
     res.send({
         productCount: productCount
     });
 });
 module.exports = router;
>>>>>>> eee295e8a198085799e662801b6f2359da9a7bd9
