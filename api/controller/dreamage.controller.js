var User = require('../../models/users.models');


module.exports.index = function(req, res) {
  User.find().then(function(users) {
      res.json(users); 
  });
};

module.exports.create = function(req, res) {
  console.log(req.file);
  res.json(req.file);

  //User.create(req.body, function(users) {
      //res.json(users);
  //});
  
};
