// req query
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var userRoute = require('./routes/users.route');


var db = require('./db');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static('publics'));


// Routes
app.use('/users', userRoute);

app.get('/', function(req, res) {
    res.render('index', {
       name: 'Thái', 
    });
});

app.listen(port, function() {
    console.log('ok ' + port);
});
