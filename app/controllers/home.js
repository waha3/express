'use strict';
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

exports.home = (req, res, next) => {
  Movie.fetch((err, movies) => {
    if (err) return next(err);
    res.render('index', {
      movies: movies
    });
  });
};

exports.movies = (req, res, next) => {
  Movie.fetchMovie(req.params.id, (err, movie) => {
    if (err) return next(err);
    res.render('movies', {
      message: 'hello world',
      movie
    });
  });
};
