const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env.test');
const envVars = dotenv.config({ path: envPath }).parsed;

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  globals: {
    GLOBAL: envVars,
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
  roots: ['<rootDir>/src', '<rootDir>/__mocks__'],
  setupFilesAfterEnv: [require.resolve('./jest.setup.js')],
  testMatch: ['/**/*test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
