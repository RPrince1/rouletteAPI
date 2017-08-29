//This code is responsiuble for accessing users accounts
var fs = require('fs')
var bodyParser = require('body-parser')

//Functionality to come later
function verifyUser(userName, password) {

}

//Returns a bool
function canBet(userID, betAmount, callback) {
	getBalance(userID, function(balance) {
			if (betAmount > balance.balance) {
				callback(false);
			}
			else if (betAmount =< balance.balance) {
				callback(true);
			}
			else {
				callback(null);
			}	
	});
}

//Returns the latest balance after betting
function updateBalance(userID, winnings) {

	//Add the balance even if it's 0
	//Return newBalance	
}

//Returns a float of their balance
function getBalance(userID, callback) {
	fs.readFile('accounts.json', 'utf8', function(err, data) {
		if(err) return console.log(err);
		//var results = JSON.parse(data);
		callback((JSON.parse(data))[userID]);
	});
}

module.exports = {
	canBet : canBet,
	updateBalance: updateBalance,
	getBalance: getBalance
}