'use strict';
const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');
const argv = require('yargs').argv;
const models = glob.sync(config.root + '/app/models/*.js');
const app = express();
const passport = require('passport');
const db = mongoose.connection;
const chalk = require('chalk');

mongoose.connect(config.db, () => {
  global.console.log('%s mongodb is connect successfully', chalk.yellow('✓'));
});

db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

models.forEach(model => require(model));
require('./config/passport.js')(passport);
require('./config/express')(app, config, passport);
require('./config/route')(app, passport);

if (argv.s) { // -s 爬虫
  require('./app/spider/index.js');
}

if (argv.d) {
  require('./app/spider/detail.js');
}

app.listen(config.port, () => global.console.log('%s Express server listening on %d port', chalk.green('✓'), config.port));
