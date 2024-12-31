const express = require('express');
const router = express.Router();
const Controller = require('./Controller')

router.post('/login',Controller.Login);

router.post('/create-admin',Controller.createAdmin);


router.post('/did',Controller.syncData);







module.exports = router;