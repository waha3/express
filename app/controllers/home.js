'use strict';
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
mongoose.Promise = Promise;

exports.home = async(function* (req, res) {
  const user = req.session.user;
  try {
    Movie.fetch((err, movies) => {
      if (err) return next(err);
      res.render('index', {
        success: req.flash('success'),
        error: req.flash('error'),
        movies,
        user
      });
    });
  } catch (err) {
    global.console.log(err);
  }
});

exports.movies = async(function* (req, res) {
  const user = req.session.user;
  try {
    Movie.fetchMovie(req.params.id, (err, movie) => {
      if (err) return next(err);
      res.render('movies', {
        movie,
        user
      });
    });
  } catch (e) {
    global.console.log(e);
  }
});
