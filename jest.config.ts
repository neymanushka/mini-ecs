export default {
 preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules','dist'],
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {},
}