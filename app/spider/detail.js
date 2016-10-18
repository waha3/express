const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
const request = require('request');
// const url = [];

const fetchDetail = async(function* () {
  try {
    const result = yield Movie.fetchUrl();
    return result;
  } catch (err) {
    throw Error(err);
  }
});


function fetchUrl(url) {
  request.get(url)
    .on('response', (res) => {
      console.log(res);
    })
    .on('error', (err) => {
      global.console.log(err);
    });
}


fetchDetail(true).then(url => console.log(url));
