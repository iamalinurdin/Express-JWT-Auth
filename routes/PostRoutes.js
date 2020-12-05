const express = require('express');
const router  = express.Router();
const verify  = require('./VerifyToken');

router.get('/', verify,(request, response) => {
  response.json({
    title: 'title',
    body : 'body',
  });
});

module.exports = router;