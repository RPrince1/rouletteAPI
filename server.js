
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var rn = require('random-number');
var spinner = require('./spin');
var winnings = require('./winnings');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8001;        // set our port

// ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the roulette api' });   
});

// accessed via http://localhost:8001/api/single/bet/amount
// example http://localhost:8001/api/single/red/5
router.get('/single/:bet/:amount/', function(req, res) {
	spinner.spin(function(result) {
		
		console.log(req.params);
		console.log(result);
		winnings.returnWinnings(req.params.bet, result, req.params.amount, function(wino) {
			console.log(wino);
			res.send("winnings:" + wino);
		});
	});
});

// accessed via http://localhost:8001/api/multiple/bets
// accessed via http://localhost:8001/api/multiple/0-5-red-5-12-5
//						Bets 5 on 0, red and 12
router.get('/multiple/:bet/', function(req, res) {
	spinner.spin(function(result) {
		console.log(result);
		bets = (req.params.bet).split("-");
		doBets(bets, result, function(moneyReturned){
			res.send(moneyReturned);
		});
	});
});

function doBets(bets, result, callback) {
		//console.log(bets);
		//console.log(result);
		var payable = 0;
		for (var x = 0; x < (bets.length); x += 2) {		
			console.log(payable);
			winnings.returnWinnings(bets[x], result, bets[x+1], function(wino) {
				payable += wino;
			});
			if (x == bets.length-2) {
				callback("winnings: " + payable);
			}
		}
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Welcome to the roulette API on port ' + port);

