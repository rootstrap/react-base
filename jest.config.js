module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/tests/__mocks__/svgrMock.js', // https://react-svgr.com/docs/jest/
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|ico)$':
      '<rootDir>/tools/fileMock.js'
  },
  moduleDirectories: ['node_modules', 'src', 'tests'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/tests/cypress',
    '<rootDir>/tests/__mocks__',
    '<rootDir>/tests/rtl/utils',
    '<rootDir>/tests/rtl/setup',
    '<rootDir>/tests/fixtures',
    '<rootDir>/tests/rtl/mockServices'
  ],
  testRegex: './tests/.*.js$',
  setupFilesAfterEnv: ['<rootDir>/tests/rtl/setup/setUpTests.js'],
  coverageDirectory: 'coverage_jest'
};
