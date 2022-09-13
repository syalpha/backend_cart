const Customer = require('../model/Customer');

exports.create = async(req, res) => {

    const customer = new Customer({
        fullName: req.body.fullName,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        city: req.body.city
    });
    await customer.save().then(data => {
        res.send({
            message: "Customer created successfully!!",
            customer: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating cart"
        });
    });
}