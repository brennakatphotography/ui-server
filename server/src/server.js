const express = require('express'), app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
require('./utils/dotenv');

app.use('/api', require('./api'));

app.use('/bin', require('./bin'));

app.use('/', require('./middleware'));

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT);
});
