import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';
import config, { environments } from './config/config';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
routes(app);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

export default app;
