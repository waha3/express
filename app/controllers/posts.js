const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Posts = mongoose.model('Posts');

exports.create = async(function* (req, res) {
  const post = new Posts(Object.assign({}, req.body, {
    author: {
      loginname: req.body.author
    }
  }));
  try {
    yield post.save();
    req.flash('success', '发布成功');
    return res.redirect('/post');
  } catch (e) {
    global.console.log(e);
  }
});

exports.fetchPost = async(function* (req, res) {
  try {
    Posts.fetchPost(req.params.id, (err, post) => {
      res.render('acticle', {
        success: req.flash('success'),
        error: req.flash('error'),
        post
      });
    });
  } catch (err){
    global.console.log(err);
  }
});
