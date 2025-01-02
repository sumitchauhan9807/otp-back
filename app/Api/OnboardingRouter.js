const express = require('express');
const router = express.Router();
const Controller = require('./Controller')


router.get('/searchdid/:query',Controller.searchDid);
router.get('/search-number/:query',Controller.searchPhoneNumbers);

router.get('/addc',Controller.addCountry);
router.get('/get-flags',Controller.getCountryFlags);









module.exports = router;