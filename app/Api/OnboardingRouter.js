const express = require('express');
const router = express.Router();
const Controller = require('./Controller')


router.get('/searchdid/:query',Controller.searchDid);








module.exports = router;