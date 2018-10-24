var db = require('../db');

module.exports.addToCart = function(req, res, next) {
    var userId = req.params.userId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/users');
        return;
    }
    
    var count = db.get('session').find({ id: sessionId }).get('cart.' + userId, 0).value();
    db.get('session').find({ id: sessionId }).set('cart.' + userId, count + 1).write();
    
    res.redirect('/users');
};