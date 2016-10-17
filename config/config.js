'use strict';
const path = require('path');
const root = path.join(__dirname, '..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: root,
    app: {
      name: 'blog'
    },
    port: process.env.PORT || 9000,
    db: 'mongodb://localhost/blog'
  },
  production: {
    root: root,
    app: {
      name: 'blog'
    },
    port: process.env.PORT || 9000,
    db: 'mongodb://localhost/blog'
  }
};

module.exports = config[env];
