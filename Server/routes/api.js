const express = require('express');
const router = express.Router();
const controller = require('../controller/apiController');

router.get('/', controller.getGB);
router.post('/game',controller.createUser);
router.get('/game/:userId', controller.startGame);


module.exports = router;