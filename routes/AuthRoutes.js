const express = require('express');
const router  = express.Router();
const User    = require('../models/UserModel');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

router.post('/register', async (request, response) => {
  // validate if email is exists
  const emailExists = await User.findOne({
    email: request.body.email,
  });

  if (emailExists) return response.status(400).send('email already exists');
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);

  const user = new User({
    name    : request.body.name,
    email   : request.body.email,
    password: hash,
  });

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(400).send(error);
  }
});

router.post('/login', async (request, response) => {
  // validate if email is exists
  const emailExists = await User.findOne({
    email: request.body.email,
  });

  if (!emailExists) {
    return response.status(400).send('email doesn\'t exists');
  }

  const validPassword = await bcrypt.compare(request.body.password, emailExists.password);

  if (!validPassword) {
    return response.status(400).send('invalid password');
  }

  // generate token
  const token = jwt.sign({
    _id: emailExists._id,
  }, process.env.TOKEN_SECRET);

  response.header('auth-token', token).send(token);
});

module.exports = router;