const router = require('express').Router();
const controller = require('./controller')

router
    .get('/', controller.getList)
    .get('/:id', controller.getOne)
    .put('/:id', controller.update)
    .post('/', controller.create)
    .delete('/:id', controller.deleteOne)
    ;

module.exports = router