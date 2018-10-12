var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

var users = [
    { id: 1, name: 'Thái' },
    { id: 2, name: 'Kem' },
]

app.get('/', function(req, res) {
    res.render('index', {
       name: 'Thái', 
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
    });

    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/toan_hoc', function(req, res) {
    var width = req.query.width;
    var height = req.query.height;
    var dientich = '';
    var err = '';

    if (width && height) {
        if (width <= 0 || height <= 0) {
            err = 'Height hoặc Width phải lón hơn 0'
        } else {
            dientich = width*height
        }
    }
    
    res.render('toan-hoc', {
        result: dientich,
        err: err
    });
});

app.get('/tam_giac', function(req, res) {
    var a = req.query.canhA;
    var b = req.query.canhB;
    var c = req.query.canhC;
    var err = '';
    var p = ( Number(a) + Number(b) + Number(c) ) / 2;
    var s = '';

    if(a && b && c) {

        if(a <= 0 || b <= 0 || c <= 0){
            err = 'Mỗi cạnh phải lớn hơn 0'
        }

        else if(Number(a) > Number(b) + Number(c) || Number(b) > Number(c) + Number(a) || Number(c) > Number(a) + Number(b) )  {
            err = 'Học lại toán đi má'
        }
        
        else{
            s = Math.sqrt( p * (p-a) * (p-b) * (p-c) )
        }
    }

    res.render('tam-giac', {
        result: s,
        err: err
    });
});

app.listen(port, function() {
    console.log('ok ' + port);
});
