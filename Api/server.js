import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
// import createError from 'http-errors';


// import router from './routes/routes';

const app = express();
const port = process.env.PORT || 4000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', (request, response) => response.json({
  message: 'Welcome to Limelight Fast Food'
}));

// app.use('/api/v1', router);


// catch 404 and forward to error handler
// app.use((request, response, next) => {
//   next(createError(404));
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;