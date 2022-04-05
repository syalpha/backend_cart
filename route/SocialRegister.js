const SocialRegister = require("../model/SocialRegister");
const express = require('express');
const router = express.Router();

const SocialRegisterController = require('../Controller/SocialRegister');

router.post('/createSocialRegister', SocialRegisterController.create);

module.exports = router;