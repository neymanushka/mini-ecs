export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/*.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	collectCoverage: true,
	coverageDirectory: './coverage',
	coverageReporters: ['html', ["lcovonly", {"projectRoot": __dirname}], 'text-summary'],
	coveragePathIgnorePatterns: ['node_modules', 'dist'],
//	coverageReporters: ['html', 'text', 'json','lcov'],
	globals: { 'ts-jest': { diagnostics: false } },
	transform: {},
};
