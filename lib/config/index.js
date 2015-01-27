var config = {
	// Dev config
	dev: {
		mode: 'dev',
		port: 8001,

		db: {
			host: 'mongodb://localhost/quo'
		},

		alm: {
			info: 'history',
			source: 'twitter,counter,scopus,mendeley,citeulike,crossref,datacite,pmceurope,pmceuropedata,pubmed,facebook,nature,reddit,researchblogging,wikipedia,wordpress,figshare,scienceseeker,pmc,articlecoverage,articlecoveragecurated,relativemetric,f1000,webofscience',
			expand_sources: false
		}
	},
	// Production config
	production: {
		mode: 'production',
		port: 2370
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'dev'] || config.dev;
};