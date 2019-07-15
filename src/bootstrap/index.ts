import { getLoggerInstance } from '../utils/logger';
import config from '../../config/index';
import { bootstrapDatabase } from './typeorm';
const logger = getLoggerInstance();

export const bootstrap = async (): Promise<boolean> => {
  try {
    await bootstrapDatabase();
    logger.info(`postgres connected host: ${config.database.host} , port: ${config.database.port}`);
  } catch (err) {
    logger.error('Error while connecting database', err);
    throw err;
  }
  return Promise.resolve(true);
};
