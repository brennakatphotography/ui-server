const express = require('express'), app = express();
const PORT = process.env.PORT || 8080;
require('./utils/dotenv');

app.use(require('./interceptors'));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));
app.use('/bin', require('./bin'));

app.set('view engine', 'jade');
app.use('/', require('./controllers'));
app.use('/', require('./controllers/error'));

app.listen(PORT, () => {
  console.info('Server is listening on port:', PORT);
});
