module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    // Allow `@/` to map to `src/client/` in Jest tests
    '@/(.*)$': '<rootDir>/src/client/$1',
  },
}
