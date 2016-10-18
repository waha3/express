'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    poster: { type: String, default: '' },
    movieName: { type: String, default: '' },
    director: { type: Array, default: '' },
    actor: { type: Array, default: '' },
    point: { type: Number, default: '' },
    tips: { type: String, default: '' },
    url: { type: String, default: '' },
    meta: {
      createAt: { type: String, default: Date.now}
    }
});

MovieSchema.statics = {
    fetch: function (cb) {
      return this.find({})
        .sort({point: -1})
        .exec(cb);
    },
    fetchUrl: function(cb) {
      return this.find({}, {url: 1, _id: 0})
        .exec(cb);
    }
};

mongoose.model('Movie', MovieSchema);
