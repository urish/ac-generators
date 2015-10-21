angular.module('topcat.app', ['firebase'])

	.value('dbUrl', 'https://topcat.firebaseio.com/cats')

	.controller('MainCtrl', function (Firebase, $firebaseArray, dbUrl) {
		var vm = this;

		var fbRef = new Firebase(dbUrl).orderByChild('votes');
		vm.cats = $firebaseArray(fbRef);
		vm.cats.$loaded().then(function () {
			vm.ready = true;
		});

		this.likeCat = function (cat) {
			cat.votes = cat.votes + 1;
			vm.cats.$save(cat);
		};

		this.unlikeCat = function (cat) {
			cat.votes = cat.votes - 1;
			vm.cats.$save(cat);
		};
	});
