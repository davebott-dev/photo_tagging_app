const express = require('express');
const router = express.Router();
const controller = require('../controller/apiController');

router.get('/', controller.getGB);
router.post('/game',controller.createUser);
router.get('/game/:userId', controller.startGame);
router.post('/game/:userId', controller.guess);
router.post('/game/:userId/win', controller.addLeader);
router.get('/game/leaderboard/:gbId',) //create a controller function for getting specific gb


module.exports = router;