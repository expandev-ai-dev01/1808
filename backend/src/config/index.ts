import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

export const config = {
  env,
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        env === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
  // Database configuration would go here if needed
  // db: {
  //   server: process.env.DB_SERVER,
  //   port: parseInt(process.env.DB_PORT || '1433', 10),
  //   database: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   options: {
  //     encrypt: process.env.DB_ENCRYPT === 'true',
  //     trustServerCertificate: env === 'development',
  //   },
  // },
};
