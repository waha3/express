const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  salt: { type: String },
  hashed_password: { type: String },
  email: { type: String, unique: true, required: true },
  mobile: { type: String },

  provider: { type: String, default: '' },
  authToken: { type: String, default: '' },
  github: {},

  profile: {
    name: { type: String },
    avator: { type: String },
    gender: { type: String },
    location: { type: String }
  },

  meta: {
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
  }
});


UserSchema.methods = {
  checkPassword: function(plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  encryptPassword: function(plainPassword) {
    if(!plainPassword) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
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
    this.hashed_password = this.encryptPassword(password);
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

UserSchema.path('hashed_password').validate(function(hashedPassword) {
  return hashedPassword.length && this._password.length;
}, 'Password cannot be blank');


// 串行的中间件 需要调用next() 保存数据前做验证
// UserSchema.pre('save', function (next) {
//   if (this.passValidation())
// });

UserSchema.statics = {
  load: function(options, callback) {
    options.select = options.select || 'name';
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(callback);
  }
};

mongoose.model('User', UserSchema);
