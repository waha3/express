'use strict';
const home = require('../app/controllers/home.js');
const user = require('../app/controllers/user.js');
const posts = require('../app/controllers/posts.js');

module.exports = (app) => {
  app.get('/', home.home);
  app.get('/movies/:id', home.movies);
  app.get('/register', (req, res) => {
    res.render('register', {
      error: req.flash('error'),
      success: req.flash('success')
    });
  });

  app.post('/register', user.create);
  app.get('/login', (req, res) => {
    res.render('login', {
      err: req.flash('err'),
      success: req.flash('success')
    });
  });
  app.post('/login', user.login);
  app.get('/post', (req, res) => {
    res.render('post', {
      err: req.flash('err'),
      success: req.flash('success')
    });
  });

  app.post('/post', posts.create);
  app.get('/post/:id', posts.fetchPost);

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
