'use strict';
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

exports.home = (req, res, next) => {
  Movie.fetch((err, movie) => {
    if (err) return next(err);
    res.render('index', {
      movie: movie
    });
  });
};

exports.movies = (req, res, next) => {
  Movie.fetch((err) => {
    if (err) return next(err);
    res.render('movies', {
      message: 'hello world'
    });
  });
};
