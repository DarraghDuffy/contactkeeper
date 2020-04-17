const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { JWT_SECRET, JWT_EXPIRES } = require('../config/configuration');

const { check, validationResult } = require('express-validator');

const router = express.Router();

//@route  GET api/auth
//@desc   Get Logged in User
//@access Private

router.get('/', auth, async (req, res) => {
  // res.send('Get logged in user');
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route  POST api/auth
//@desc   Auth user and get token
//@access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req);
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.msg);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
