const express = require('express');
const router = express.Router();

const SocialRegisterController = require('../controller/SocialRegister');

router.post('/createSocialRegister', SocialRegisterController.create);

module.exports = router;