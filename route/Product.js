const express = require('express');
const Product = require('../model/Product');
const multer = require("multer");
const router = express.Router();
const ProductController = require('../Controller/Product')

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");


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

//  router.get('/', ProductController.findAll);
//  router.get('/:id', ProductController.findOne);



// router.post('/create', verifyToken, ProductController.create);
// router.patch('/:id',  verifyTokenAndAdmin,ProductController.update);

// router.post('/create', ProductController.create);
// router.patch('/:id', verifyTokenAndAdmin, ProductController.update);

// router.patch('/:id',  verifyTokenAndAdmin,ProductController.update);

// router.delete('/:id', verifyTokenAndAdmin, ProductController.destroy);

// router.patch('/:id',ProductController.update);
// router.delete('/:id', ProductController.destroy);


module.exports = router;