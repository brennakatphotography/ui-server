const fs = require('fs');
const http = require('http');
const { PHOTO_API } = process.env;

const streamFile = (path, id) => {
  return new Promise((resolve, reject) => {
    const filename = `/tmp/${Date.now()}-${id}.jpg`;
    const file = fs.createWriteStream(filename);
    file.on('open', () => {
      http.get(`${PHOTO_API}${path}${id}`, stream => stream.pipe(file));
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
