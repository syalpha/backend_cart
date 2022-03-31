const SocialRegister = require('../model/SocialRegister');

exports.create = async(req, res) => {
    const socialRegister = new SocialRegister({
        email: req.body.email,
        name: req.body.name,
        photoUrl: req.body.photoUrl,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    await socialRegister.save().then(data => {
        res.send({
            message: "socialRegister created successfully!!",
            socialRegister: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating cart"
        });
    });
}