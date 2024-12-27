module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS imports
    "^@/(.*)$": "<rootDir>/$1", // Handle aliasing for `@/` paths
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Set up custom Jest environment
  resolver: undefined, // Use default resolver
  testEnvironment: "jsdom", // Use jsdom for React or Next.js testing
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignore non-relevant paths
  collectCoverage: false, // Disable coverage collection unless needed
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}", // Include all JS/TS/React files for potential coverage
    "!**/node_modules/**", // Exclude dependencies
    "!**/vendor/**", // Exclude vendor files
  ],
  coverageReporters: ["json", "lcov", "text", "clover"], // Specify coverage report formats
  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env", "@babel/preset-react"], // Inline Babel configuration
      },
    ],
  },
};
