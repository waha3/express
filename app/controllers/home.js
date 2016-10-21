'use strict';
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
mongoose.Promise = Promise;

exports.home = async(function* (req, res) {
  try {
    Movie.fetch((err, movies) => {
      if (err) return next(err);
      res.render('index', {
        movies: movies,
        success: req.flash('success'),
        error: req.flash('error')
      });
    });
  } catch (err) {
    console.log(err);
  }
});

exports.movies = async(function* (req, res) {
  try {
    Movie.fetchMovie(req.params.id, (err, movie) => {
      if (err) return next(err);
      res.render('movies', {
        movie
      });
    });
  } catch (e) {
    console.log(e);
  }
});
