const express = require('express');
const router = express.Router();
const CustomerController = require('../Controller/Customer');

router.post('/create', CustomerController.create);

module.exports = router;