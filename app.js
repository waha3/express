'use strict';
const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');
const argv = require('yargs').argv;
const models = glob.sync(config.root + '/app/models/*.js');
const app = express();
const db = mongoose.connection;

mongoose.connect(config.db);

db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

models.forEach(model => require(model));

require('./config/express')(app, config);

if (argv.s) { // -s 爬虫
  require('./app/spider/index.js');
}

if (argv.d) {
  require('./app/spider/detail.js');
}

app.listen(config.port, () => global.console.log('Express server listening on port ' + config.port));
