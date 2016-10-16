'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    let user = req.body;
    let newUser = new User(user);

    // if (newUser.name == '' || newUser.password == '' || newUser.mobile == null || newUser.email == '') {
    //     req.flash('err', '字段不能为空')
    //     return res.redirect('/register')
    // }

    // if (newUser.password !== newUser.repeat_password) {
    //     req.flash('err', '两次的密码不一样')
    //     return res.redirect('/register')
    // }

    newUser.save((err, user) => {
        if (err) return next(err);
    });
    res.redirect('/');
};
