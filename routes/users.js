const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

const router = express.Router();

// Note that server.js registers the following route:
// app.use('/api/users/', require('./routes/users'));
// all end points here will be prefixed with /api/users/

//@route  POST api/users
//@desc   Register a user
//@access Public

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'a valid email is required').isEmail(),
    check('password', 'password should be at least 6 characters!').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      user = new User({ name, email, password });
      user.password = await bcrypt.hash(password, 10);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: config.get('jwtExpires'),
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;
