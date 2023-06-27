import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { __name__(pascalCase), __name__(pascalCase)Schema } from "./schema";
import { __name__(pascalCase)Service } from "./service";
import { __name__(pascalCase)Repo } from "./repo";
import { __name__(pascalCase)Resolver  } from "./resolver";
import { BullModule } from '@nestjs/bull';
import { __name__(pascalCase)Ingress } from "./ingress";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: __name__(pascalCase).name, schema: __name__(pascalCase)Schema
            }
        ]),
        BullModule.registerQueue({
            name: '__name__(pascalCase)',
          }),
    ],
    providers: [__name__(pascalCase)Service, __name__(pascalCase)Repo, __name__(pascalCase)Resolver, __name__(pascalCase)Ingress],
})
export class __name__(pascalCase)Module {}
