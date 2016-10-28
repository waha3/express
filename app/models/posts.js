const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const PostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author: {
    loginname: { type: String },
    avator: { type: String }
  }
});

PostSchema.statics = {
  fetchPost: function(cb) {
    this.find({})
      .exec(cb);
  }
};

mongoose.model('Posts', PostSchema);
