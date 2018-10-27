var User = require('../models/users.models');

var shortid = require('shortid');

module.exports.index = function(req, res) {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 100;

    // var start = (page - 1) * perPage;
    // var end = page * perPage;

    // var drop = (page - 1) * perPage;

    // res.render('users/index', {
    //     // users: db.get('users').value().slice(start, end)
    //     users: db.get('users').drop(drop).take(perPage).value()
    // });

    User.find().then(function(users) {
        res.render('users/index', {
            users: users
        });
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
    var _id = req.params._id;

    User.findById(_id, function (err, user){
        res.render('users/view', {
            user: user
        });
    });

    // var user = db.get('users').find({id: id}).value();

    
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\')

    User.create(req.body);
    res.redirect('/users');
};

module.exports.update = function(req, res) {

    var _id = req.params._id;

    if (_id) {
        User.findOne({ _id: _id }, function (err, user) {
            if (err) {
                 res.redirect('/users'); // Nếu lỗi về trang user
            } else {
                if (user) {
                    res.render('users/update', {
                        user: user
                    });
                } else {
                    res.redirect('/users'); // Nếu không tìm thấy user về trang user
                }

            }
        });
    } else {
        res.redirect('/users'); // Nêu không tìm thấy _id tjif về trang user
    }

};

module.exports.postUpdate = function(req, res) {
    var _id = req.body._id;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
        // User.findOneAndUpdate(query, {name: name, phone: phone, email: email , password: password});
    // User.findOneAndUpdate({_id: _id}, { $set: { name: name, phone: phone, email: email , password: password }})

    if (_id) {
        User.findOneAndUpdate({_id: _id}, {$set:{ name: name, phone: phone, email: email , password: password }}, {new: true}, (err, user) => {
            res.redirect('/users');
        });
    } else {
        res.redirect('/users');
    }
    

    // db.get('users')
    //     .find({id: id})
    //     .assign({name: name, phone: phone, email: email , password: password })
    //     .write()
};

module.exports.delete = function(req, res) {
  

    User.findOneAndRemove({_id : req.params._id}, function (err,user){
        res.redirect('/users');
    });

    // db.get('users')
    //     .remove({id: id})
    //     .write()


    // res.redirect('/users');
};