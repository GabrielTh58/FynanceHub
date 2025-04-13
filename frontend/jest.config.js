/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // usamos jsdom para simular o DOM do navegador
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // permite usar @/utils, @/hooks etc
  },
}
