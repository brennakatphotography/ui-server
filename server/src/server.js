const express = require('express'), app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
require('./utils/dotenv');

app.use(require('./middleware/interceptors'));

app.use('/api', require('./api'));

app.use('/auth', require('./auth'));

app.use('/bin', require('./bin'));

app.use('/', require('./middleware/routes'));

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT);
});
