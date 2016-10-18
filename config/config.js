'use strict';
const path = require('path');
const rootPath = path.resolve(__dirname, '..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'blog'
    },
    port: process.env.PORT || 9000,
    db: 'mongodb://localhost/blog'
  },
  production: {
    root: rootPath,
    app: {
      name: 'blog'
    },
    port: process.env.PORT || 9000,
    db: 'mongodb://localhost/blog'
  }
};

module.exports = config[env];
