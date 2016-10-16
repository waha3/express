'use strict';
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

module.exports = (req, res, next) => {
  Movie.fetch((err, movie) => {
    if (err) return next(err);
    res.render('index', {
      movie: movie
    });
  });
};
