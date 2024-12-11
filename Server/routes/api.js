const express = require('express');
const router = express.Router();
const controller = require('../controller/apiController');

router.get('/', controller.getGB);
router.post('/game',controller.createUser);
router.get('/game/:userId', controller.startGame);
router.post('/game/:userId', controller.guess);
router.post('/game/:userId/win', controller.addLeader);


module.exports = router;