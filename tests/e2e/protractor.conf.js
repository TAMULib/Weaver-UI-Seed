exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost/weaver-ui-seed/',
	specs: [
		'index-spec.js',
		'auth-spec.js',
		'users-spec.js',
		'theme-spec.js'
	],
	rootElement : 'body',
	multiCapabilities: [{
		browserName: 'chrome',
		shardTestFiles: true,
    	maxInstances: 1
	},
	{
		browserName: 'firefox',
		shardTestFiles: true,
    	maxInstances: 1
	}],
	params: {
		admin: {
			username: 'LibraryDemo4',
			password: 'ud<AhLVAXbPM9ZXw',
			uin: '990000081'
		},
		user: {
			username: 'LibraryDemo5',
			password: 'TB}YkakDMeN8fWPa',
			uin: '990000082'
		}
	}
};
