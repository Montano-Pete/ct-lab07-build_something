import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pieController from './controllers/pies';

const app = express();

app.use(express.json());

app.use('/api/v1/pies', pieController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
