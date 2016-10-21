'use strict';
const mongoose = require('mongoose');
const {wrap: async} = require('co');
const User = mongoose.model('User');
mongoose.Promise = Promise;

exports.create = async(function * (req, res) {
  if (req.password !== req.repeat_password) {
    const user = new User(req.body);
    try {
      yield user.save((err, result) => {
        if (err) console.log(err);
        console.log(result);
      });
      req.flash('success', '注册成功');
      res.render('register', {
        error: req.flash('error'),
        success: req.flash('success')
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    req.flash('error', '两次密码输入不一致');
    res.render('register', {
      error: req.flash('error'),
      success: req.flash('success')
    });
  }
});

exports.login = async(function * (req, res) {
  // const user = new User(req.body);
  // console.log(user);
  const data = User.encryptPassword(req.body.password);
  console.log(data);
  // try {
  //   yield User.findOne({
  //     name: req.body.name,
  //     hased_password: User.encryptPassword(req.body.password)
  //   }, (err, result) => {
  //     if (err) console.log(err);
  //     console.log(result);
  //     return res.redirect('/');
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
});
