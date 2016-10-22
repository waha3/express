const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const env = process.env.NODE_ENV || 'development';

module.exports = (app, config) => {
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.set('views', config.root + '/app/views/');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(session({
      secret: 'express blog',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
  }));

  app.use(flash());

  // passport.js
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
};
