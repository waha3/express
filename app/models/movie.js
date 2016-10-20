'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  poster: { type: String, default: '' },
  movieName: { type: String, default: '' },
  director: { type: Array, default: [] },
  actors: { type: Array, default: [] },
  point: { type: Number, default: null },
  tips: { type: String, default: '' },
  url: { type: String, default: '' },
  summary: { type: String, default: '' },
  comments: [{
    title: { type: String, default: '' },
    url: { type: String, default: '' },
    content: { type: String, default: '' },
    author: {
      loginname: { type: String, default: '' },
      url: { type: String, default: '' },
      avator: { type: String, default: '' }
    }
  }],
  meta: {
    createAt: { type: Date, default: Date.now }
  }
});

MovieSchema.statics = {
  fetch: function (cb) {
    return this.find({})
      .sort({point: -1})
      .exec(cb);
  },

  fetchMovie: function(id, cb) {
    return this.findById(id)
      .exec(cb);
  },

  getUrl: function(cb) {
    return this.find({}, {url: 1, _id: 0})
      .exec(cb);
  },

  updateMovieInfo: function(data) {
    this.where({url: data.url}).update({$set: {
      director: data.director,
      actors: data.actors,
      summary: data.summary,
      comments: [
        ...data.comments
      ]
    }}).exec();
  }
};

mongoose.model('Movie', MovieSchema);
