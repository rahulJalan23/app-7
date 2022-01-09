const jwt = require('jsonwebtoken');
const Register = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    // console.log("x-auth-token", token);
    // console.log("x-auth-refToken", refToken);
    const verifyuser = jwt.verify(token, 'this is my key');

    const user = await Register.findOne({ _id: verifyuser._id }).select(
      '-password'
    );
    // console.log(user);
    req.token = token;
    req.user = user;
    if (user != null) {
      return next();
    }
    return res
      .status(401)
      .send({ success: false, message: 'No such user found.' });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
module.exports = auth;
