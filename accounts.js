//This code is responsiuble for accessing users accounts
var fs = require('fs')
var bodyParser = require('body-parser')

//Functionality to come later
function verifyUser(userName, password) {

}

//Returns a bool
function canBet(userID, betAmount, callback) {

	var balance = getBalance(userID, function(callback, data) {;
	if (betAmount > balance) {
		callback(false);
	}
	else if (betAmount < balance) {
		callback(true);
	}	
}
}

//Returns the latest balance after betting
function updateBalance(userID, winnings) {

	//Add the balance even if it's 0
	//Return newBalance	
}

//Returns a float of their balance
function getBalance(userID, callback) {
	let points = JSON.parse(fs.readFileSync("accounts.json", "utf8"));
	callback(points[userID]);
}


module.exports = {
	canBet : canBet,
	updateBalance: updateBalance,
	getBalance: getBalance
}