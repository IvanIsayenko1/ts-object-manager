module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ES modules
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files
  },
  moduleFileExtensions: ["ts", "js"],
  testPathIgnorePatterns: ["node_modules/", "dist/"],
  testMatch: ["**/*.test.ts"],
};
