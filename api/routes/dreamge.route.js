var express = require('express');
var controller = require('../controller/dreamage.controller');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: './publics/uploads/' });

router.get('/api-upload', controller.index);
router.post('/api-upload', upload.single('avatar'), controller.create);

module.exports = router;

