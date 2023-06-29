import { MongooseModuleOptions } from "@nestjs/mongoose";

export const mongooseOptions: MongooseModuleOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    keepAlive: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 5,
    maxPoolSize: 20,
    minPoolSize: 5,
} as MongooseModuleOptions