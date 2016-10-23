'use strict';
const mongoose = require('mongoose');
const {wrap: async} = require('co');
const User = mongoose.model('User');
mongoose.Promise = Promise;

exports.create = async(function * (req, res) {
  if (req.body.password === req.body.repeat_password) {
    const user = new User(req.body);
    try {
      yield user.save((err) => {
        if (err) global.console.log(err);
      });
      req.flash('success', '注册成功');
      return res.redirect('/register');
    } catch (err) {
      global.console.log(err);
    }
  } else {
    req.flash('error', '两次密码输入不一致');
    return res.redirect('/register');
  }
});

exports.login = async(function * (req, res) {
  try {
    yield User.findOne({name: req.body.name})
    .exec((err, user) => {
      if (err) global.console.log(err);
      const _password = user.encryptPassword(req.body.password);
      if (_password === user.hased_password) {
        req.session.user = user;
        req.flash('success', '登录成功');
      }
    });
    return res.redirect('/login');
  } catch (err) {
    req.flash('error', err);
    global.console.log(err);
  }
});
