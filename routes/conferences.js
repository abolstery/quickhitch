var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('conferences', { title: 'Conferences' });
});

module.exports = router;