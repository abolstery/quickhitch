var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Index' });
});

//this is the view (localhost:3000.bookingsList) that lists
//all the bookings, this is how to grab all the data from 
//the mongodb
//using db connection to full "docs" variable with user data 
//TO DISPLAY!!!
router.get('/bookingsList', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('bookingsList',{
			"bookingsList": docs
		});
	});
});

/* GET home page. */
router.get('/book', function(req, res) {
  res.render('book', { title: 'Booking Ride' });
});

/* Post to the add User service*/
router.post('/adduser', function(req,res){
	//internal database variable
	var db = req.db; 
	var name = req.body.username; //get information from form. rely on name attribute
	var conference = req.body.conference;
	var date1 = req.body.date1;
	var flightNumber = req.body.flightNumber;
	var arrival =req.body.arrival;
	var number= req.body.number;

	//Make a new collection aka table
	var collection = db.get('usercollection');

	collection.insert({
		"name": name,
		"conference": conference,
		"date": date1,
		"flightNumber": flightNumber,
		"arrival": arrival,
		"number": number

	}, function(err, doc){
		if (err){ //if it failed, return error
			res.send("There was a problem adding the information");
		}
		else {
			// If it worked, set the header so the address bar doesn't still say /adduser
			res.location("bookingsList");
			// And forward to success page
			res.redirect("bookingsList");
		}	
	});
});	




module.exports = router;
