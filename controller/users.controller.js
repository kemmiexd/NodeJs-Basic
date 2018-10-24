var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 100;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    var drop = (page - 1) * perPage;

    res.render('users/index', {
        // users: db.get('users').value().slice(start, end)
        users: db.get('users').drop(drop).take(perPage).value()
    });
};

module.exports.search = function(req, res) {
    var q = req.query.q;
    var users = db.get('users').value();
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
    });

    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();

    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\')

    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.update = function(req, res) {
    
    var id = req.params.id;

    if (id) {
        var user = db.get('users').find({id: id}).value();

        res.render('users/update', {
            user: user
        });
    } else {
        res.redirect('/users');
    }
    
};

module.exports.postUpdate = function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;

    db.get('users')
        .find({id: id})
        .assign({name: name, phone: phone, email: email , password: password })
        .write()

    res.redirect('/users');
};

module.exports.delete = function(req, res) {
    var id = req.params.id;
    
    db.get('users')
        .remove({id: id})
        .write()
    

    res.redirect('/users');
};