const Product = require('../model/Product')


// Create and Save a new create
exports.create = async (req, res) => {
    if (!req.body.title && !req.body.desc && !req.body.img && !req.body.price && !req.body.categorie ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const product = new Product({

        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categorie: req.body.categorie,
        price: req.body.price,
    });
    
    await product.save().then(data => {
        res.send({
            message:"Product created successfully!!",
            product:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating product"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single product with an id
exports.findOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a product by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a product with the specified id in the request
exports.destroy = async (req, res) => {
    await Product.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `product not found.`
          });
        } else {
          res.send({
            message: "Product deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};