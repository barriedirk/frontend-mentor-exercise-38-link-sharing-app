// former configuration
// ---------------------------
// export default {
//   displayName: '@project/backend',
//   preset: '../../jest.preset.js',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
//   },
//   moduleFileExtensions: ['ts', 'js', 'html'],
//   coverageDirectory: 'test-output/jest/coverage',
// };

export default {
  displayName: '@project/backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'test-output/jest/coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/index.ts', '!src/main.ts'],
  verbose: true,
};
