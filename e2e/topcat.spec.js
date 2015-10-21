var Firebase = require('firebase');
var co = require('co');
var cats = require('./cats.json');
var http = require('request-promise-json');

describe('Topcat app', function () {
	var EC = protractor.ExpectedConditions;
	var catLocator = by.className('topcat-box');
	var DB_URL = 'https://topcat.firebaseio.com/e2e/cats';

	// We are going to use a specific DB url just for the e2e test
	// which can be different from production
	beforeEach(function () {
		browser.addMockModule('e2eMock', function (dbUrl) {
			angular.module('e2eMock', []).value('dbUrl', dbUrl);
		}, DB_URL);
	});

	beforeEach(co.wrap(function*() {
		yield http.put(DB_URL + '.json', cats);

		yield browser.get('/index.html');

		// wait for the for the model to be loaded (for the cats to be ready)
		var mainElement = element(by.className('topcat-container'));
		yield browser.wait(EC.presenceOf(mainElement));
		yield browser.wait(function () {
			return mainElement.evaluate('vm.ready');
		});
	}));

	it('should display 20 cats', co.wrap(function *() {
		var elementCount = yield element.all(catLocator).count();
		expect(elementCount).toBe(21);
	}));

	it('update the number of votes when you upvote a cat', co.wrap(function *() {
		var firstCat = element.all(catLocator).first();
		yield firstCat.element(by.className('fa-thumbs-up')).click();

		var newCats = yield http.get(DB_URL + '/14133914169.json');
		expect(newCats.votes).toBe(5);
	}));
});
