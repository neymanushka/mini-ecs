export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/*.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	collectCoverage: true,
	coverageDirectory: './coverage',
	coveragePathIgnorePatterns: ['node_modules', 'dist'],
	coverageReporters: ['html', 'text', 'json'],
	globals: { 'ts-jest': { diagnostics: false } },
	transform: {},
};
