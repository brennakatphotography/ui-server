const { forEach } = require('fun-util');

const { parsed: parsedIn } = require('dotenv').load();
const { parsed: parsedUp } = require('dotenv').load({ path: `${process.cwd()}/../.env` });

if (parsedIn || parsedUp) {
  forEach({ ...parsedIn, ...parsedUp }, (value, key) => {
    console.info(`Loaded environment variable: "${key}" with value "${value}"`);
  });
}
