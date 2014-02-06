var config = {
	// Dev config
	dev: {
		mode: 'dev',
		port: 8001
	},
	// Production config
	production: {
		mode: 'production',
		port: 8001
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'dev'] || config.dev;
};