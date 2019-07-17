import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as koaBodyparser from 'koa-bodyparser';
import * as jsonMiddleware from 'koa-json';
import * as staticServe from 'koa-static-server';
import * as path from 'path';
import * as Boom from 'boom';
import config from '../config';
import { bootstrap } from './bootstrap/index';
import { getLoggerInstance, Logger } from './utils/logger';
// middlewares
import routeMiddleware from './routes/index';
import errorMiddleware from './middlewares/error';
import responseMiddleware from './middlewares/response';

//const logger = new Logger('tour-of-heroes').createLogger();
const logger = getLoggerInstance();
const docPath = path.join(__dirname, '../doc');
const app = new Koa();

bootstrap()
  .then(() => {
    app.use(staticServe({ rootDir: docPath, rootPath: '/api/docs' }));
    app.use(Logger.koa(logger));
    app.use(helmet());
    app.use(
      koaBodyparser({
        onerror: (err, ctx) => {
          logger.error(err);
          ctx.throw('Cannot parse body', 422);
        },
      }),
    );
    app.use(errorMiddleware());
    app.use(jsonMiddleware());
    app.use(routeMiddleware());
    app.use(responseMiddleware());

    app.listen(config.server.port, () => {
      logger.info('server started on port %d', config.server.port);
    });

    app.on('error', err => {
      logger.error('server error', err);
    });
  })
  .catch(err => {
    logger.fatal(err);
  });
