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
const Product = require('../model/Product');
const multer = require("multer");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");

const ProductController = require('../Controller/Product')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, Date.now() + fileName)
  }
})
const uploadOptions = multer({ storage: storage })

router.post('/create', uploadOptions.single('img'), async(req,res) => {
  const fileName = req.file;
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
  const productForm = new Product({
        img:`${basePath}${fileName}`,
        title: req.body.title,
        desc: req.body.desc,
        categorie: req.body.categorie,
        price: req.body.price,
        qtite: req.body.qtite,
  });
  await productForm.save().then(data => {
    res.send({
        message:"Product created successfully!!",
        productForm:data
    });
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating productForm"
    });
});
});
router.get('/all', ProductController.findAll);
router.get('/:id', ProductController.findOne);
<<<<<<< HEAD

router.post('/create', verifyToken, ProductController.create);
router.patch('/:id',  verifyTokenAndAdmin,ProductController.update);

router.post('/create', ProductController.create);
router.patch('/:id', verifyTokenAndAdmin, ProductController.update);

=======
router.patch('/:id',  verifyTokenAndAdmin,ProductController.update);
>>>>>>> 3ea30a88ba43cd4298aa495e7540615568780f32
router.delete('/:id', verifyTokenAndAdmin, ProductController.destroy);

module.exports = router;