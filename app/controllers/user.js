'use strict';
const mongoose = require('mongoose');
const {wrap: async} = require('co');
const User = mongoose.model('User');
mongoose.Promise = Promise;

exports.create = async(function * (req, res) {
  if (req.body.password === req.body.repeat_password) {
    const user = new User(req.body);
    try {
      yield user.save((err, result) => {
        if (err) console.log(err);
        console.log(result);
      });
      req.flash('success', '注册成功');
      return res.redirect('/register');
    } catch (err) {
      console.log(err);
    }
  } else {
    req.flash('error', '两次密码输入不一致');
    return res.redirect('/register');
  }
});

exports.login = async(function * (req, res) {
  const user = new User();
  try {
    yield User.findOne({name: req.body.name})
    .select('salt hased_password')
    .exec((err, doc) => {
      const _hasedPassword = user.encryptPassword(req.body.password);
      console.log(_hasedPassword);
      if (doc.hased_password === _hasedPassword) {
        req.flash('success', '登录成功');
      } else {
        req.flash('error', '账号或密码错误');
      }
    });
    return res.redirect('/login');
  } catch (err) {
    req.flash('error', err);
    console.log(err);
  }
});
