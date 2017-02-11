const { forEach } = require('fun-util');

const { parsed } = require('dotenv').load();

if (parsed) {
  forEach(parsed, (value, key) => {
    console.info(`Loaded environment variable ${key} as "${value}"`);
  });
}
