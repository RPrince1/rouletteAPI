/* Types of bet
	Number 		(0-36)
	Red or Black	red/black
	Even or Odd	even/odd 
	Columns		c1, c2, c3
	Twelves		t1, t2, t3	
	Eighteen	e1, e2		
*/

var c1 = [1,4,7,10,13,16,19,22,25,28,31,34]
var c2 = [2,5,8,11,14,17,20,23,26,29,32,35]
var c3 = [3,6,9,12,15,18,21,24,27,30,33,36]
	
function returnWinnings(bet, result, amount, callback) {
	if (bet >= 0 || bet < 37 ) {
		if (bet == result[0]) {
			callback(amount * 36);
		}
		else {callback(0);}
	}
	else {
		switch (bet) {
			case "red":
				redBlack(bet,result,amount,callback);
				break;
			case "black":
				redBlack(bet,result,amount,callback);
				break;
			case "odd":
				oddEven(bet,result,amount,callback);
				break;
			case "even":
				oddEven(bet,result,amount,callback);
				break;
			case "c1":
				isMatch(c1, result[0], amount, callback);
				break;
			case "c2":
				isMatch(c2, result[0], amount, callback);
				break;
			case "c3":
				isMatch(c3, result[0], amount, callback);
				break;
			case "t1":
				t1(result[0], amount, callback);
				break;
			case "t2":
				t2(result[0], amount, callback);
				break;
			case "t3":
				t3(result[0], amount, callback);
				break;
			case "e1":
				e1(result[0], amount, callback);
				break;
			case "e2":
				e2(result[0], amount, callback);
				break;
			}
	}
}

//Determines if red or black bet wins
function redBlack (bet, result, amount, callback) {
	if (bet == result[1]) {
		callback(amount * 2);
	}
	else {
		callback(0);
	}
}

//Determines if odd or even bet wins
function oddEven (bet, result, amount, callback) {
	if (result[0] % 2 == 0 && bet == "even") {
		callback(amount *2);
	}
	else if (result[0] % 2 == 1 && bet == "odd") {
		callback(amount *2);
	}
	else {
		callback(0);
	}
}

function t1(result, amount, callback) {
	if (result < 13) {
		callback(amount * 3);
	}
	else {
		callback(0);
	}
}

function t2(result, amount, callback) {
	if (result > 12 && result < 25) {
		callback(amount * 3);
	}
	else {
		callback(0);
	}	
}

function t3(result, amount, callback) {
	if (result > 24) {
		callback(amount * 3);
	}	
	else {
		callback(0);
	}
}

function e1(result, amount, callback) {
	if (result < 19) {
		callback(amount * 2);		
	}
	else {
		callback(0);
	}
}

function e2(result, amount, callback) {
	if (result > 18) {
		callback(amount * 2);
	}
	else {
		callback(0);
	}
}
	

function isMatch (bet, result, amount, callback) {
	for (var x = 0; x < c1.length; x++) {
		if (result == bet[x]) {
			return callback(amount * 3);
		}
		else if(x+1 == c1.length) {
			callback(0);
		}	
	}
}


module.exports = {
	returnWinnings : returnWinnings
}

