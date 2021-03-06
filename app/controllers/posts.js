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
  const user = req.session.user;
  try {
    Posts.fetchPost((err, post) => {
      if (err) global.console.log(err);
      res.render('acticle', {
        success: req.flash('success'),
        error: req.flash('error'),
        post,
        user
      });
    });
  } catch (err){
    global.console.log(err);
  }
});
