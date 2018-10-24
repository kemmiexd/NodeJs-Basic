var express = require('express');
var multer = require('multer');

var controller = require('../controller/users.controller');
var validate = require('../validate/users.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var upload = multer({ dest: './publics/uploads/' })

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', function(req, res, next) {
    res.cookie('name-id', 12345);
    res.send('Helo Madu Phuc')
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

router.get('/update/:id', controller.update);

router.post('/update', validate.postUpdate, controller.postUpdate);

router.get('/delete/:id', controller.delete);

module.exports = router;

