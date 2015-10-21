exports.config = {
	capabilities: {
		'browserName': 'chrome'
	},
	framework: 'jasmine2',
	baseUrl: 'http://localhost:1337',
	specs: ['e2e/*.spec.js']
};
