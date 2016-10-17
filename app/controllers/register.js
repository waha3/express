'use strict';
const mongoose = require('mongoose');
// const crypto = require('crypto');
const { wrap: async } = require('co');
const User = mongoose.model('User');

// exports.load = async(function* (req, res, next, _id) {
//   const criteria = { _id };
//   try {
//
//   }
// })

exports.create = async(function* (req, res) {
  const user = new User(req.body);
  try {
    yield user.save();
    res.rediret('/');
  } catch(err) {
    throw new Error(err);
  }
});
