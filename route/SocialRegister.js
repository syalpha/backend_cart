const SocialRegister = require("../model/SocialRegister");
const express = require('express');
const router = express.Router();

const SocialRegisterController = require('../Controller/SocialRegister');

router.post('/createSocialRegister', SocialRegisterController.create);

router.get('/allSocialRegister', SocialRegisterController.findAll);

router.get(`/get/count`, async(req, res) => {
    const socialRegisterCount = await SocialRegister.countDocuments()

    if (!socialRegisterCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        socialRegisterCount: socialRegisterCount
    });
});

module.exports = router;