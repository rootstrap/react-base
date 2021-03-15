module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/__tests__/__mocks__/svgrMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/tools/fileMock.js'
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/cypress',
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/utils',
    '<rootDir>/__tests__/setup'
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/setUpTests.js'],
  coverageDirectory: 'coverage_jest'
};
