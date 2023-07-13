import * as dotenv from 'dotenv';
dotenv.config();

export const appVariables = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  PEOPLE_DB_URL: process.env.PEOPLE_DB_URL,
  PEOPLE_DB: { dbName: process.env.PEOPLE_DB || "people" },
  PEOPLE_DB_CONNECTION: 'PEOPLE_DB_CONNECTION',
  IDENTITY_DB_CONNECTION: 'IDENTITY_DB_CONNECTION',
  IDENTITY_DB_URL: process.env.IDENTITY_DB_URL,
  IDENTITY_DB: { dbName: process.env.IDENTITY_DB || "identity" },
  ASSETS_DB_URL: process.env.ASSETS_DB_URL,
  ASSETS_DB: { dbName: process.env.ASSETS_DB || "assets" },
  ASSETS_DB_CONNECTION: 'ASSETS_DB_CONNECTION',
  ELASTIC_CLOUD_ID: process.env.ELASTIC_CLOUD_ID,
  ELASTIC_NODE_URL: process.env.ELASTIC_NODE_URL,
  ELASTIC_AUTH_USER_NAME: process.env.ELASTIC_AUTH_USER_NAME || 'elastic',
  ELATIC_AUTH_USER_PASSWORD: process.env.ELATIC_AUTH_USER_PASSWORD,
  APP_SECRET: process.env.APP_SECRET
}
