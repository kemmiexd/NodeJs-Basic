var express = require('express');

var controller = require('../controller/users.controller');
var validate = require('../validate/users.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/update/:id', controller.update);

router.post('/update', validate.postUpdate, controller.postUpdate);

router.get('/delete/:id', controller.delete);

module.exports = router;

