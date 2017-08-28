
var rn = require('random-number');
var fs = require('fs')

var gen = rn.generator({
	min: 0,
	max: 36,
	integer: true
});

function spin(callback) {
	var value = gen();
	var colour = dictionary[value];

	fs.appendFile('history.txt', "," + value, function (err) {
	  if (err) throw err;
	});
	callback([value, colour]);
}

module.exports = {
	spin: spin
};

var dictionary = {
	0: "green",
	1:"red",
	3:"red",
	5:"red",
	7:"red",
	9:"red",
	12:"red",
	14:"red",
	16:"red",
	18:"red",
	19:"red",
	21:"red",
	23:"red",
	25:"red",
	27:"red",
	30:"red",
	32:"red",
	34:"red",
	36:"red",
	2:"black",
	4:"black",
	6:"black",
	8:"black",
	10:"black",
	11:"black",
	13:"black",
	15:"black",
	17:"black",
	20:"black",
	22:"black",
	24:"black",
	26:"black",
	28:"black",
	29:"black",
	31:"black",
	33:"black",
	35:"black",
}
