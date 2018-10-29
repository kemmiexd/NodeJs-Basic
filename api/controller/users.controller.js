var User = require('../../models/users.models');

var shortid = require('shortid');

module.exports.index = function(req, res) {
    User.find().then(function(users) {
        res.json(users); 
    });
};

module.exports.create = function(req, res) {
    User.create(req.body, function(users) {
        res.json(users);
    });
    
};
