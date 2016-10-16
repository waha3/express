'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    poster: String,
    movieName: String,
    director: [ String ],
    actor: [ String ],
    point: Number,
    tips: String,
    url: [ String ],
    meta: {
        createAt: {
            type: String,
            default: Date.now
        }
    }
});

MovieSchema.statics = {
    fetch: function (cb) {
      return this.find({})
        .sort({point: -1})
        .exec(cb);
    }
};

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
