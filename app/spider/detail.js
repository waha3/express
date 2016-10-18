const mongoose = require('mongoose');
// mongoose.Promise = Promise;
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
// const url = [];

const fetchDetail = async(function* () {
  try {
    yield Movie.fetchUrl();
  } catch (err) {
    throw Error(err);
  }
});


fetchDetail(true).then(data => console.log(data));
