const Order = require('../model/Order')


const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  

// create and Save a new 

exports.create = async (req, res) => {
    if (!req.body.userId && !req.body.quantity && !req.body.amount && !req.body.address && !req.body.status && !req.body.imglogo && !req.body.note ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const order = new Order({

        userId: req.body.userId,
        quantity: req.body.quantity,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status,
        imglogo: req.body.imglogo,
        note: req.body.note,
    });
    
    await order.save().then(data => {
        res.send({
            message:"order created successfully!!",
            order:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating order"
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
    
    await Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Order not found.`
            });
        }else{
            res.send({ message: "Order updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

  //DELETE
exports.destroy =  async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //GET USER ORDERS
exports.find = async (req, res) => {
    try {
      const order = await Order.find({ userId: req.params.userId });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // //GET ALL

exports.findAll = async (req, res) => {
    try {
      const order = await Order.findAll();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET MONTHLY INCOME

exports.income = async (req, res) => {
    
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },

        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  };


