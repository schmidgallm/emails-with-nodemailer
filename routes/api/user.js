// Dependecies
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Init router method from express
const router = express.Router();

// Import Models
const User = require('../../models/User');

/*
// -----------
// POST and PUT Routes
// -----------
*/

// @route   POST api/v1/auth/user
// @desc    Create a user
// @access  PUBLIC
router.post(
  '/',
  // express validator checks
  [
    check('user_name', 'User name is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required'),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'password must be more than 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      // if errors from validation exists
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // req.body destructure
      const { first_name, last_name, email, password } = req.body;

      // check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // init new user if not already exists
      user = await new User({
        first_name,
        last_name,
        email,
        password
      });

      // salt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save new user to db
      await user.save();
    } catch (err) {
      console.warn(err.message);
      res.status(500).send('Server Error...');
    }
  }
);

/*
// -----------
// DELETE Routes
// -----------
*/

// @route   DELETE api/v1/users
// @desc    DELETE a user
// @access  PRIVATE
router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  // if not user
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  // delete user from db
  await user.remove();

  return res.status(200).json({ message: 'User succesfully deleted' });
});

module.exports = router;
