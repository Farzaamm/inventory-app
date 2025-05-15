const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/contact', indexController.contact);
router.get('/services', indexController.services);

module.exports = router;