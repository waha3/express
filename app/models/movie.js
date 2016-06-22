'use strict'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
    poster: String,
    movieName: String,
    director: [String],
    actor: [String],
    point: Number,
    tips: String,
    url: [String],
    meta: {
        createAt: {
            type: String,
            default: Date.now
        }
    }
});

//静态方法
MovieSchema.statics = {
    fetch: function (cb) {
        return this.find({})
            .limit(20)
            .sort({point: -1})
            .exec(cb)
    }
}

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie
