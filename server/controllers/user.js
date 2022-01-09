const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { User } = require('../models');

const login = [
  check('email', 'Email is required').notEmpty(),
  check('password', 'password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email } = req.body;
      const { password } = req.body;
      const userfind = await User.findOne({ email });
      console.log(password, userfind);
      if (userfind) {
        const ismatch = await bcrypt.compare(password, userfind.password);
        if (ismatch) {
          const { token, refToken } = await userfind.generateAuthToken();
          console.log(token);
          return res.send({ token, refToken });
        }
        return res.json({ msg: 'password incorrect' });
      }

      return res.send('No user found');
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  },
];

const register = [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { password } = req.body;

      const userdata = new User({
        email: req.body.email,
        password: req.body.password,
      });
      const { token, refToken } = await userdata.generateAuthToken();
      await userdata
        .save()
        .then(() =>
          res.status(200).send({
            msg: 'user succesfully registered',
            token,
            refToken,
          })
        )
        .catch((err) => res.status(403).json({ msg: err }));
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  },
];

module.exports = {
  login,
  register,
};
