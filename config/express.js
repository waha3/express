const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const env = process.env.NODE_ENV || 'development';

module.exports = (app, config, passport) => {
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.set('views', config.root + '/app/views/');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');


  app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(cookieParser());
  // app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
      secret: 'my_project',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
  }));
  app.use(flash());
  app.use(compress({
    threshold: 512
  }));

  //  use passport session
  app.use(passport.initialize());
  app.use(passport.session());
};
