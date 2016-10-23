const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const { wrap: async } = require('co');
const request = require('request');
const cheerio = require('cheerio');
mongoose.Promise = Promise;

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
    poster: '',
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

  data.poster = $('.nbgnbg').find('img').attr('src');
  data.movieName = $('#content h1').text().trim();
  data.summary = $('.related-info').find('.short > span').text().trim();
  data.director.push($('#info > span').eq(0).find('.attrs a').text().trim());

  let $actors = $('.attrs').eq(2).find('span');
  $actors.each(i => data.actors.push($actors.eq(i).find('a').text().trim()));

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
  return data;
}

function fetchUrl(url) {
  let promise = new Promise((resolve, reject) => {
    let html = '';
    request.get(url)
      .on('response', (res) => {
        res.on('data', (doc) => {
          html = html + doc;
        });
        res.on('end', () => {
          let $ = cheerio.load(html);
          let result = parseHtml($, url);
          resolve(result);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
  return promise;
}

function updateInfo(data) {
  Movie.updateMovieInfo(data);
}

fetchDetail(true)
  .then(urlArr => urlArr.map(i => {
    fetchUrl(i.url).then(data => updateInfo(data));
  }))
  .catch(err => global.console.log(err));
