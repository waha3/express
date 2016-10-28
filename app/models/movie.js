'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  poster: { type: String },
  movieName: { type: String },
  director: { type: Array },
  actors: { type: Array },
  point: { type: Number },
  tips: { type: String },
  url: { type: String },
  summary: { type: String },
  comments: [{
    title: { type: String },
    url: { type: String },
    content: { type: String },
    author: {
      loginname: { type: String },
      url: { type: String },
      avator: { type: String }
    }
  }],
  meta: {
    createAt: { type: Date }
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

  updateMovieInfo: function(data, cb) {
    this.where({url: data.url}).update({$set: {
      poster: data.poster,
      director: data.director,
      actors: data.actors,
      summary: data.summary,
      comments: [
        ...data.comments
      ]
    }}).exec(cb);
  }
};

mongoose.model('Movie', MovieSchema);
