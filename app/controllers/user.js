'use strict';
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const User = mongoose.model('User');
mongoose.Promise = Promise;

exports.create = async(function* (req, res) {
  const user = new User(req.body);
  try {
    yield user.save();
    return res.render('register', {
      err: req.flash('err').toString(),
      success: req.flash('success').toString()
    });
  } catch(err) {
    global.console.log(err);
  }
});

exports.login = async(function* (req, res) {
  const user = new User(req.body);
  try {
    yield user.findOne();
    return res.redirect('/');
  } catch(err) {
    global.console.log(err);
  }
});
