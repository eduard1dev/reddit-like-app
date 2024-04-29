module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  moduleDirectories: ['node_modules', './src/lib/test-utils.tsx', __dirname],
};
