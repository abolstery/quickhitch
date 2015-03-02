
var mongoose = require('mongoose'); // mongoose is a Node.js library 
mongoose.connect('http://localhost:3000'); //made the database connection
var database = mongoose.connection;

database.on('error', function (err) {
	console.log('connection error', err);
});

database.once('open', function () { 
	console.log("Mongoose connected at:"); 
});


var Schema = mongoose.Schema;
var conferenceSchema = new Schema({
	name:String,
	conferenceCode: String,
	flightDate: Date,
	flightNumber: String,
	arrivalTime:Time,
	isAlive: Boolean
});