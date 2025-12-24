export default ({ env }) => {
  const isDocker = !!env('DOCKER_HOST_INTERNAL'); // docker environment
  const isCloudRun = !!env('DATABASE_SOCKET'); // Cloud Run unix socket

  if (isCloudRun) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: `/cloudsql/${env('CLOUD_SQL_CONNECTION_NAME')}`,
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: false,
        },
        pool: { min: 2, max: 10 },
      },
    };
  }

  if (isDocker) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'host.docker.internal'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'strapi'),
          user: env('DATABASE_USERNAME', 'strapi'),
          password: env('DATABASE_PASSWORD', 'strapi'),
          ssl: false,
        },
        pool: { min: 2, max: 10 },
      },
    };
  }

  // Local Node
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: 2, max: 10 },
    },
  };
};
