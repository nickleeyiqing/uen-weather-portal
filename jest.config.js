module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };
  