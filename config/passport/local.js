const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy({
    usernameField: '895240740@qq.com',
    passwordField: '1234'
  },
  function (email, password, done) {
    User.findOne({email: email}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (user.hashed_password === user.encryptPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
);
