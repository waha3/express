'use strict';
const home = require('../app/controllers/home.js');
const register = require('../app/controllers/register.js');
const login = require('../app/controllers/login.js');

module.export = (app) => {
  app.get('/', home);
  app.get('/register', (req, res) => {
      res.render('register', {
          err: req.flash('err').toString()
      });
  });
  app.post('/register', register);
  app.get('/login', (req, res) => {
      res.render('login', {
          err: req.flash('err').toString(),
          success: req.flash('success').toString()
      });
  });
  app.post('/login', login);
};
