const router = require('express').Router();

router.use('/contacts', require('./contacts'));
router.use('/todos', require('./todos'));
// router.use('/teachers', require('./teachers'));

module.exports = router;