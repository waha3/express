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
    throw Error(err);
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
      content: '',
      author: {
        loginname: '',
        url: '',
        avator: ''
      }
    }]
  };

  data.movieName = $('#content h1').text().trim();
  data.director.push($('#info > span').eq(0).find('.attrs a').text().trim());
  // let $dom = $('.actor span.attrs').children('a');
  // $dom.each(i => console.log(i));
  data.summary = $('.related-info').find('.short');
  // data.comments =
  $comments = $('#review_section > div').eq(1);
  $comments.each(i => {
    data.comments.push({
      title: $comments[i].find('h3 a:last')
    });
  });

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
