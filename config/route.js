'use strict';
const home = require('../app/controllers/home.js');
// const register = require('../app/controllers/register.js');
// const login = require('../app/controllers/login.js');

module.exports = (app) => {
  app.get('/', home);
  app.get('/register', (req, res) => {
      res.render('register', {
          err: req.flash('err').toString()
      });
  });

  // app.post('/register', register);
  // app.get('/login', (req, res) => {
  //     res.render('login', {
  //         err: req.flash('err').toString(),
  //         success: req.flash('success').toString()
  //     });
  // });
  // app.post('/login', login);

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
