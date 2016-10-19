const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
const request = require('request');
const cheerio = require('cheerio');
mongoose.Promise = Promise;
let insertData = [];

const fetchDetail = async(function* () {
  try {
    const result = yield Movie.getUrl();
    return result;
  } catch (err) {
    throw new Error(err);
  }
});

function parseHtml($, url) {
  const data = {
    url: url,
    director: [],
    actors: [],
    summary: '',
    comments: [{
      title: '',
      url: '',
      content: '',
      author: {
        loginname: '',
        url: '',
        avator: ''
      }
    }]
  };

  data.movieName = $('#content h1').text().trim();
  data.summary = $('.related-info').find('.short > span').text().trim();
  data.director.push($('#info > span').eq(0).find('.attrs a').text().trim());
  let $actors = $('.attrs').eq(2).find('span');
  $actors.each(i => data.actors.push($actors[i].find('a').text().trim()));
  let $comments = $('#review_section > div').eq(1).find('.review');
  $comments.each(i => {
    data.comments.push({
      title: $comments.eq(i).find('h3 a').last().text().trim(),
      url: $comments.eq(i).find('h3 a').last().attr('href').trim(),
      content: $comments.eq(i).find('.review-short > span').text().trim(),
      author: {
        loginname: $comments.eq(i).find('h3 a').first().attr('title').trim(),
        url: $comments.eq(i).find('h3 a').first().attr('href').trim(),
        avator: $comments.eq(i).find('h3 a').first().find('img').attr('src').trim()
      }
    });
  });
  // console.log(data);
  insertData.push(data);
}

function fetchUrl(urlArray, callback) {
  let html = '';
  for (let i of urlArray) {
     request.get(i.url)
      .on('response', (res) => {
        res.on('data', (doc) => {
          html = html + doc;
        });
        res.on('end', () => {
          let $ = cheerio.load(html);
          parseHtml($, i.url);
          callback();
        });
      })
      .on('error', (err) => {
        global.console.log(err);
      });
    }
  }

function updateInfo() {
  for (let i of insertData) {
    Movie.updateMovieInfo(i.url, i.director);
  }
}

fetchDetail(true)
  .then(arr => fetchUrl(arr, updateInfo));
