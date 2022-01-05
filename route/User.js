const express = require('express');
const router = express.Router();

const UserController = require('../Controller/User')

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/create', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;