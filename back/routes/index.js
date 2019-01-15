const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/ping', function(req, res, next) {
  res.json('Ok');
});

module.exports = router;
