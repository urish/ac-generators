var $http = require('request-promise-json');

function *bitcoinRate() {
	var r = yield $http.get('http://api.bitcoinaverage.com/ticker/USD');
	console.log('1 Bitcoin == ' + r.last + ' USD');
}

var iter = bitcoinRate();
var promise = iter.next().value;
promise.then(onSuccess);

function onSuccess(result) {
	var nextItem = iter.next(result);
}
