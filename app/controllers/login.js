'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    User.findOne(req.body, (err, user) => {
        if(err) return next(err);
        if(!user){
          req.flash('err', '账号错误');
          res.redirect('/login');
        }else {
          req.flash('success', '登入成功');
          return res.redirect('/');
        }
    });
};
