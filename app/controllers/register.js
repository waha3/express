'use strict';
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const User = mongoose.model('User');
mongoose.Promise = Promise;

exports.create = async(function* (req, res) {
  const user = new User(req.body);
  try {
    yield user.save();
    return res.redirect('/');
  } catch(err) {
    // throw new Error(err);
    global.console.log(err);
  }
});
