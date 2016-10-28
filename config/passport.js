const mongoose = require('mongoose');
const User = mongoose.model('User');
const local = require('./passport/local.js');
// const github = require('./passport/github.js');

module.exports = function (passport) {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => User.findById(id, (err, user) => {
    cb(null, user);
  }));

  passport.use(local);
  // passport.use(github);
};
