module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Allow `@/` to map to `src/client/` in Jest tests
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/client/$1',
  },
}
