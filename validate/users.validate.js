module.exports.postCreate = function(req, res, next) {
    var errors = [];
    
    if (!req.body.name) {
        errors.push('Name is required.');
    }

    if (!req.body.phone) {
        errors.push('Phone is required.');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        return
    }

    next();
};

module.exports.postUpdate = function(req, res, next) {
    var errors = [];
    
    
    if (!req.body.name) {
        errors.push('Đừng để tên trống nha Chung Hạ sĩ');
    }

    if (!req.body.phone) {
        errors.push('Số điện thoại cũng vậy nhé Chung Trung Sĩ');
    }

    if (errors.length) {
        res.render('users/update', {
            errors: errors,
            user: req.body
        });
        return
    }

    next();
};