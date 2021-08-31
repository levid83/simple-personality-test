module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(unit).(spec|test).[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**index.js**",
    "!src/**server.js**",
    "!src/database/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
