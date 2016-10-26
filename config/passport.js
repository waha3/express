const mongoose = require('mongoose');
const User = mongoose.model('User');
const local = require('./passport/local.js');
const github = require('./passport/github.js');

module.exports = function (passport) {
  passport.use(local);
  passport.use(github);

  passport.serializeUser((user, cb) => {
    console.log(user.id);
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => User.findById(id, (err, user) => {
    cb(null, user);
  }));
};
