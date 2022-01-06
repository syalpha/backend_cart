const express = require('express');
const router = express.Router();

const UserController = require('../Controller/User')

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./VerifyToken");

router.get('/', verifyTokenAndAdmin, UserController.findAll);
router.get('/:id', verifyTokenAndAdmin, UserController.findOne);
router.post('/create', verifyToken, UserController.create);
router.patch('/:id', verifyTokenAndAuthorization, UserController.update);
router.delete('/:id', verifyTokenAndAuthorization, UserController.destroy);

module.exports = router;