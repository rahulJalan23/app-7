const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const user = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email!');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    refToken: {
      type: String,
      default: 'None',
    },
    reward: Number,
  },
  { timestamps: true }
);
// Do not use async functions, they are not supported
user.methods.generateAuthToken = async function generateToken() {
  console.log(this);
  try {
    const token = jwt.sign({ _id: this._id.toString() }, 'this is my key', {
      expiresIn: '1y',
    });
    const refToken = jwt.sign({ _id: this._id.toString() }, 'this is my key', {
      expiresIn: '1y',
    });
    this.refToken = refToken;
    await this.save();
    return { token, refToken };
  } catch (error) {
    console.log(error);
    return null;
  }
};

user.pre('save', async function generateHashBeforeSaving(next) {
  // console.log(`current password is ${this.password}`)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', user);
