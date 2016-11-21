'use strict';
const home = require('../app/controllers/home.js');
const user = require('../app/controllers/user.js');
const posts = require('../app/controllers/posts.js');

module.exports = (app, passport) => {
  app.get('/', home.home);
  app.get('/movies/:id', home.movies);

  app.get('/register', (req, res) => {
    res.render('register', {
      error: req.flash('error'),
      success: req.flash('success'),
      user: req.session.user
    });
  });
  app.post('/register', user.create);

  app.get('/login', (req, res) => {
    res.render('login', {
      error: req.flash('error'),
      success: req.flash('success'),
      user: req.session.user
    });
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
  });

  app.get('/loginout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
  });

  app.get('/post', (req, res) => {
    res.render('post', {
      error: req.flash('error'),
      success: req.flash('success'),
      user: req.session.user
    });
  });
  app.post('/post', posts.create);
  app.get('/post/:id', posts.fetchPost);
  app.get('/list', posts.fetchPost);

  app.get('/user/:id', user.userInfo);

  // OAuth route
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });

  // 公司项目
  app.get('/project/cart', (req, res) => res.render('project/cart'));
  app.get('/project/order', (req, res) => res.render('project/confirm_order'));

  // 错误处理
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });
};
