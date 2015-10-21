var $http = require('request-promise-json');

function bitcoinRate() {
	$http.get('http://api.bitcoinaverage.com/ticker/USD')
		.then(function (r) {
			console.log('1 Bitcoin == ' + r.last + ' USD');
		});
}

bitcoinRate();
