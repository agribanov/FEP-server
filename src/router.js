const router = require('express').Router();

router.use('/students', require('./students'));
router.use('/todos', require('./todos'));
// router.use('/teachers', require('./teachers'));

module.exports = router;