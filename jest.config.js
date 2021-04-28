module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageReporters: ['html', 'text','json'],
	globals: {
		'ts-jest': {
			tsconfig: {
			},
		},
	},
};
