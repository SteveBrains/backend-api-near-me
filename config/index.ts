import * as dotenv from 'dotenv';
dotenv.config();

export const appVariables = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  MONGO_DB: { dbName: process.env.MONGO_DB || 'index-pdf-api-dev' },
};
