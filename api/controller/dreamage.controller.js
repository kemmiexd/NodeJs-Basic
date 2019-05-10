var User = require('../../models/users.models');
var imgur = require('imgur');
imgur.setClientId('6792ecf3f0f58b1');


module.exports.index = function(req, res) {
  User.find().then(function(users) {
      res.json(users); 
  });
};

module.exports.create = function(req, res) {
  // console.log(req.files.avatar);
  const { avatar } = req.files;
  const base64avatar = avatar.data.toString('base64');


  imgur.uploadBase64(base64avatar)
    .then(function (file) {
        res.status(200).json(file);
    })
    .catch(function (err) {
        console.error(err.message);
    });
  // res.json(req.file);

  //User.create(req.body, function(users) {
      //res.json(users);
  //});
  
};
