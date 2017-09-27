
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var rn = require('random-number');
var spinner = require('./spin');
var winnings = require('./winnings');
var account = require('./accounts');
var fs = require('fs')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8002;        // set our port

// ROUTES FOR OUR API
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the roulette api' });   
});

//Get the history of the previous spins
router.get('/history', function(req,res) {
	showData = fs.readFile('history.txt', 'utf8', function(err, data) {
		if(err) return console.log(err);
		res.send(data);
	});
});

//Test route
router.get('/test', function(req,res) {
	
});

// accessed via http://localhost:8001/api/single/bet/amount/account
// example http://localhost:8001/api/single/red/5/001
router.get('/single/:bet/:amount/:account/', function(req, res) {
	account.canBet(req.params.account, req.params.amount, function(isSufficient) {
		if (isSufficient) {
			spinner.spin(function(result) {
				console.log(req.params);
				console.log(result);
				winnings.returnWinnings(req.params.bet, result, req.params.amount, function(winnings) {
					account.updateBalance(req.params.account, (winnings - req.params.amount), function(calls) {
						res.send("Balance updated for account " + req.params.account + ", you won " + winnings + " betting " + req.params.bet + ". The result was (" +  result + ")");
					});
				});
			});
		}
		else {
			res.send("Insufficient funds");
		}
	});
});

// accessed via http://localhost:8001/api/multiple/bets
// accessed via http://localhost:8001/api/multiple/0-5-red-5-12-5 // Bets 5 on 0, red and 12
router.get('/multiple/:bet/:account/', function(req, res) {
	var allBets = req.params.bet.split("-");
	//totalBets returns the total amount bet across all bets
	totalBets(req.params.bet.split("-"), function(totalBet) {
		/*Check the total bet amount against the amount in the their account
		  Returns isSufficient either true if able to bet or false if unable to bet */
		account.canBet(req.params.account, totalBet, function(isSufficient) {
			console.log("This account was able to bet: " + isSufficient);
			if(isSufficient) {
				console.log("bets: " + allBets);
				spinner.spin(function(result) {
					console.log("result: " + result);
					doBets(allBets, result, function(moneyReturned){
						account.updateBalance(req.params.account, (moneyReturned - totalBet), function(calls) {
							res.send("Balance updated for account " + req.params.account + ", you won " + moneyReturned + " betting " + totalBet + ". The result was (" +  result + ")");
						});
					});
				});
			}
			else {
				res.send("Insufficient funds");
			}
		});
	});
});

/*--- Runs through the bets when multiple bets are placed  --*/
function doBets(bets, result, callback) {
		var payable = 0;
		for (var x = 0; x < (bets.length); x += 2) {	
			winnings.returnWinnings(bets[x+1], result, bets[x], function(wino) {
				payable += wino;
			});
			if (x == bets.length-2) {
				console.log("winnings: " + payable);
				callback(payable);
			}
		}
}

function totalBets(bets, callback) {
	var betTotal = 0;
	for (var x = 0; x < (bets.length); x+=2) {
		betTotal += Number.parseInt(bets[x]);
		if (x == bets.length-2) {
			callback(betTotal);
		}
	}
}

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Welcome to the roulette API on port ' + port);

