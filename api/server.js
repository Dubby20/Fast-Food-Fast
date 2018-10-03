import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import router from './routes/routes';

require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (request, response) => response.json({
  message: 'Welcome to Limelight Fast Food'
}));
app.use('/public', express.static('UI'));

app.use('/api/v1', router);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;