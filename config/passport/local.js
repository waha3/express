const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy(
  function (username, password, done) {
    // console.log('...........');
    // console.log(username, password);
    User.findOne({name: username}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { error: '用户不存在'});
      if (user.hashed_password === user.encryptPassword(password)) {
        return done(null, user, { success: '登录成功' });
      } else {
        return done(null, false, { error: '邮箱错误' });
      }
    });
  }
);
