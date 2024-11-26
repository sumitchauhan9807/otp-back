const express = require('express');
const router = express.Router();
const Controller = require('./Controller')

router.post('/create',Controller.create);
router.get('/',Controller.getAll);






module.exports = router;