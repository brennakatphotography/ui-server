const app = require('express-outbound')(require('express'));
require('./utils/dotenv');
const logger = require('./utils/logger');
const { PORT = 8080 } = process.env;

app.use(require('./interceptors'));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));
app.use('/bin', require('./bin'));

app.use('/', require('./controllers'));
app.use('/', require('./controllers/error'));

app.listen(PORT, () => {
  logger.info('Server is listening on port:', PORT);
});
