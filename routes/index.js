var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('use');
  res.render('index', { title: 'Index' });
});

module.exports = router;
