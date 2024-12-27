// jest.setup.js
require("@testing-library/jest-dom");
const fetch = require("node-fetch");
globalThis.fetch = fetch;
jest.mock(
  "react-country-state-city/dist/react-country-state-city.css",
  () => {}
);
