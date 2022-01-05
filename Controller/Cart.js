const Cart = require("../model/Cart");

//CREATE

exports.create = async (req, res) => {
    if (!req.body.userId && !req.body.numcart && !req.body.status ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const cart = new Cart({

        userId: req.body.userId,
        numcart: req.body.numcart,
        status: req.body.status,
    });
    
    await cart.save().then(data => {
        res.send({
            message:"Cart created successfully!!",
            cart:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating cart"
        });
    });
};

//UPDATE
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await Cart.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cart not found.`
            });
        }else{
            res.send({ message: "art updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

//DELETE
exports.destroy = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER CART
exports.findOne = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};


// //GET ALL

exports.findAll = async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
