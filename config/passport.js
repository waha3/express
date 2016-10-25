const mongoose = require('mongoose');
const User = mongoose.model('User');
const github = require('./passport/github.js');

module.exports = function (passport) {
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.load({ criteria: { _id: id } }, cb));

  passport.use(github);
};