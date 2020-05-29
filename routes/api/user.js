// Dependecies
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Init router method from express
const router = express.Router();

// Import Models
const User = require('../../models/User');

// Import email controllers
const subscribe = require('../../controllers/subscribe');
const unsubscribe = require('../../controllers/unsubscribe');

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
    check('first_name', 'First name is required')
      .not()
      .isEmpty(),
    check('last_name', 'First name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail()
  ],
  async (req, res) => {
    try {
      console.log('made it');
      // if errors from validation exists
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // req.body destructure
      const { first_name, last_name, email } = req.body;

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
        email
      });

      // save new user to db
      await user.save();

      // send welcome email and pass in users email, first name, and response
      await subscribe(user.email, user.first_name, res);
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

  // send succesful unsibsribe message and pass in users email, first name, and response
  await unsubscribe(user.email, user.first_name, res);
});

module.exports = router;
