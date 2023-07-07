import * as dotenv from 'dotenv';
dotenv.config();

export const appVariables = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  PEOPLE_DB_URL: process.env.PEOPLE_DB_URL,
  PEOPLE_DB: { dbName: process.env.PEOPLE_DB || 'people' },
  PEOPLE_DB_CONNECTION: 'PEOPLE_DB_CONNECTION',
  IDENTITY_DB_CONNECTION: 'IDENTITY_DB_CONNECTION',
  IDENTITY_DB_URL: process.env.IDENTITY_DB_URL,
  IDENTITY_DB: { dbName: process.env.IDENTITY_DB || 'identity' },
  LOCATION_DB: { dbName: process.env.SEARCH_DB || 'steve-api' },
};
