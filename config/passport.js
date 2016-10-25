const mongoose = require('mongoose');
const User = mongoose.model('User');
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = '5bbcca4710f1f88ea0dd';
const GITHUB_CLIENT_SECRET = '7b7e4b95c462f766314496f74245f7b17fcbc305';


module.exports = (passport) => {
  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:9000/login'
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      const options = {
        'github.id': profile.id
      };
      User.load(options, (err, user) => {
        if (err) return cb(err);
        if (!user) {
          global.console.log('here');
        } else {
          return cb(err, user);
        }
      });
    }
  ));
};
