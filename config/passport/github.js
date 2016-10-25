const mongoose = require('mongoose');
const User = mongoose.model('User');
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = '5bbcca4710f1f88ea0dd';
const GITHUB_CLIENT_SECRET = '7b7e4b95c462f766314496f74245f7b17fcbc305';

module.exports = new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:9000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  console.log(profile);
    const options = {
      criteria: { 'github.id': profile.id }
    };
    User.load(options, function (err, user) {
      if (err) return done(err);
      if (!user) {
        global.console.log('用户不存在');
        // user = new User({
        //   name: profile.displayName,
        //   email: profile.emails[0].value,
        //   username: profile.username,
        //   provider: 'github',
        //   github: profile._json
        // });
        // user.save(function (error) {
        //   if (error) global.console.log(err);
        //   return done(null, user);
        // });
      } else {
        return done(err, user);
      }
    });
});
