import 'reflect-metadata';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import swaggerDocs from './config/swagger';
import app from './app';
import './config/container';

app.listen(3001, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});

export default app;
