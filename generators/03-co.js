var $http = require('request-promise-json');
var co = require('co');

function *bitcoinRate() {
	var r = yield $http.get('http://api.bitcoinaverage.com/ticker/USD');
	console.log('1 Bitcoin == ' + r.last + ' USD');
}

co(bitcoinRate);
