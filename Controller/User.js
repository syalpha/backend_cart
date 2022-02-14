const User = require('../model/User')


// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.fullname && !req.body.createDate && !req.body.phone && !req.body.addresse && !req.body.birthday && !req.body.avatar && !req.body.poste && !req.body.workadd && !req.body.entreprisename) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const user = new User({

        email: req.body.email,
        fullname: req.body.fullname,
        isAdmin:req.body.isAdmin,
        createDate: req.body.createDate,
        phone: req.body.phone,
        addresse: req.body.addresse,
        birthday: req.body.birthday,
        avatar: req.body.avatar,
        poste: req.body.poste,
        workadd: req.body.workadd,
        entreprisename: req.body.entreprisename,
    });
    
    await user.save().then(data => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await User.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};