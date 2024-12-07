const express = require('express');
const router = express.Router();
const controller = require('../controller/apiController');

router.get('/', controller.getGB);
router.post('/',controller.createUser);


module.exports = router;