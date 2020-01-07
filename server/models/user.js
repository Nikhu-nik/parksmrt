const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    email: String,
    mobileNumber: Number,
    password: String
});

userSchema.pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
        } else {
          this.password = hash;
          return next();
        }
      });
    });
  });

module.exports = mongoose.model('user', userSchema,'users');
