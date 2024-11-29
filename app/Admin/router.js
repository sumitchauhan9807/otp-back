const express = require('express');
const router = express.Router();
const Controller = require('./Controller')

router.post('/users',Controller.Users);









module.exports = router;