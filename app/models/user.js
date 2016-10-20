'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  salt: { type: String, default: '' },
  hased_password: { type: String, default: '' },
  email: { type: String, default: '' },
  mobile: { type: Number, default: null },
  meta: {
    createAt: { type: String, default: Date.now },
    updateAt: { type: String, default: Date.now }
  }
});


UserSchema.methods = {
  checkPassword: function(plainPassword) {
    return this.encryptPassword(plainPassword) === this.hased_password;
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  encryptPassword: function(plainPassword) {
    if(!plainPassword) return '';
    try {
      return crypto.createHmac('sha1', this.makeSalt())
        .update(plainPassword)
        .digest('hex');
    } catch(err) {
      return err;
    }
  }
};


// virtual property
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hased_password = this.encryptPassword(password);
  }).get(function() {
    return this._password;
  });


// validations
UserSchema.path('name').validate(function(name) {
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('hased_password').validate(function(hasedPassword) {
  return hasedPassword.length && this._password.length;
}, 'Password cannot be blank');


// 串行的中间件 需要调用next()
// UserSchema.pre('save', function (next) {});

UserSchema.statics = {
  load: function(options, callback) {
    options.select = options.select || 'name';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(callback);
  },

  // login: function(req, cb) {
  //   return this.findOne({
  //     name: req.body.name,
  //     password: this.encryptPassword(req.body.password)
  //   }).exec(cb);
  // }
};

mongoose.model('User', UserSchema);
