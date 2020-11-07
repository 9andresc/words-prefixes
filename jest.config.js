module.exports = {
  moduleNameMapper: {
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'node'
}
