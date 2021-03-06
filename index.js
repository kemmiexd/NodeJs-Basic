require('dotenv').config();
console.log(process.env.SESSION_SECRET);

// req query
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fileUpload = require('express-fileupload');

// var csurf = require('csurf');
// var mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiUserRoute = require('./api/routes/users.route');
var apiUpload = require('./api/routes/dreamge.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var cors = require('cors');
var db = require('./db');

var port = 3001;

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/publics', express.static(path.join(__dirname, '/publics')));

app.use(cors());
app.options('*', cors());
app.use(fileUpload());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/users', apiUserRoute);
app.use('/api', apiUpload);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
// app.use(csurf({ cookie: true }));


// Routes
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);



app.get('/', function(req, res) {
    res.render('index', {
       name: 'Chung thiếu úy', 
    });
});

app.listen(port, function() {
    console.log('ok ' + port);
});
