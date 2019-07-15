import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
  };
  api: {
    baseURL: string;
  };
  database: {
    connectionName: string;
    databaseType: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

const config = convict<IConfig>({
  env: {
    format: ['local', 'development', 'production'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'local',
  },
  server: {
    port: {
      format: 'port',
      env: 'NODE_PORT',
      default: 4001,
    },
  },
  api: {
    baseURL: {
      format: String,
      env: 'API_BASEURL',
      default: '/api/v1',
    },
  },
  database: {
    connectionName: {
      format: String,
      env: 'CONN_NAME',
      default: 'default',
    },
    databaseType: {
      format: String,
      env: 'TYPEORM_CONNECTION',
      default: 'postgres',
    },
    host: {
      format: String,
      env: 'TYPEORM_HOST',
      default: '',
    },
    port: {
      format: 'port',
      env: 'TYPEORM_PORT',
      default: 5432,
    },
    username: {
      format: String,
      env: 'TYPEORM_USERNAME',
      default: '',
    },
    password: {
      format: String,
      env: 'TYPEORM_PASSWORD',
      default: '',
    },
    database: {
      format: String,
      env: 'TYPEORM_DATABASE',
      default: '',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
