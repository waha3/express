const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const PostSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  author: {
    loginname: { type: String, default: '' },
    avator: { type: String, default: '' }
  }
});

PostSchema.statics = {
  fetchPost: function(cb) {
    this.find({})
      .exec(cb);
  }
};

mongoose.model('Posts', PostSchema);
