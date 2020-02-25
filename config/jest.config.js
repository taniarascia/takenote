module.exports = {
  // Setting the root to the actual root, since this file is in root/config
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>/src', '<rootDir>/tests/unit'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Allow `@/` to map to `src/client/` in Jest tests
    '@/(.*)$': '<rootDir>/src/client/$1',
    '@resources/(.*)$': '<rootDir>/src/resources/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
