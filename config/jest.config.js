module.exports = {
  // Setting the root to the actual root, since this file is in root/config
  rootDir: '../',
  roots: ['<rootDir>/src', '<rootDir>/tests/integration'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Allow `@/` to map to `src/client/` in Jest tests
    '@/(.*)$': '<rootDir>/src/client/$1',
    '@resources(.*)$': '<rootDir>/src/resources/$1',
  },
}
