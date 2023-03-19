const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/railwayGateTimingDB', {useNewUrlParser: true, useUnifiedTopology: true});

const timingSchema = {
	station: String,
	openingTime: String,
	closingTime: String
};

const Timing = mongoose.model('Timing', timingSchema);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/timing', function(req, res) {
	const station = req.body.station;
	Timing.findOne({station: station}, function(err, foundTiming) {
		if (err) {
			console.log(err);
			res.send("Error occurred");
		} else {
			res.send("The gate at " + foundTiming.station + " opens at " + foundTiming.openingTime + " and closes at " + foundTiming.closingTime);
		}
	});
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
