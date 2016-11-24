const addHeaders = require('./addHeaders');
const fs = require('fs');
const http = require('http');
const { PHOTO_API } = process.env;
const url = require('url');

const createConfig = location => {
  return {
    ...url.parse(location),
    headers: addHeaders()
  };
};

const streamFile = resource => {
  return new Promise((resolve, reject) => {
    const randomId = Math.floor(Math.random() * 5000);
    const filename = `/tmp/${Date.now()}-${randomId}.jpg`;
    const file = fs.createWriteStream(filename);
    file.on('open', () => {
      http.get(createConfig(`${PHOTO_API}${resource}`), stream => stream.pipe(file));
    }).on('finish', () => resolve(filename)).on('error', reject);
  });
};

const sendFile = response => file => {
  return new Promise((resolve, reject) => {
    response.sendFile(file, err => {
      if (err) return reject(err);
      resolve(file);
    });
  });
};

module.exports = {
  sendFile,
  streamFile
};
