'use strict';
const https = require('https');
const cheerio = require('cheerio');
const { wrap: async } = require('co');
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
mongoose.Promise = Promise;

let config = {
  url: 'https://movie.douban.com/top250',
  data: []
};

function request(start) {
  let promise = new Promise((resolve, reject) => {
      let url = config.url + '?start=' + start;
      https.get(url, (res) => {
        let html = '';
        res.on('data', (docs) => {
          html = html + docs;
        });
        res.on('end', () => {
          resolve();
          let $ = cheerio.load(html);
          let $dom = $('ol.grid_view li');
          $dom.each(i => {
            config.data.push({
              poster: $dom.eq(i).find('.pic img').attr('src'),
              movieName: $dom.eq(i).find('.info .title').eq(0).text(),
              point: parseFloat($dom.eq(i).find('.star .rating_num').text()),
              tips: $dom.eq(i).find('.inq').text(),
              url: $dom.eq(i).find('.hd > a').attr('href')
            });
          });
        });
      }).on('error', (err) => {
        reject(err);
      });
  });
  return promise;
}

const asyncRequest = async(function* () {
  try {
    for (let i = 0; i < 1; i++) {
        yield request(i * 25);
    }
  } catch (err) {
    throw new Error(err);
  }
});

asyncRequest(true).then(() => {
  for (let i of config.data) {
    let movie = new Movie({
        poster: i.poster,
        movieName: i.movieName,
        point: i.point,
        tips: i.tips,
        url: [i.url]
    });
    movie.save((err) => {
      if (err) window.console.error(err);
    });
  }
}).catch(err => window.console.error(err));
