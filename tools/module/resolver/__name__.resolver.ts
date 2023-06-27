import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Resolver()
export class __name__(pascalCase)Resolver {
    constructor(@InjectQueue('__name__(pascalCase)') private playQueue: Queue) {}
    @Query(() => Boolean)
    async __name__(kebabCase)Query() {
        await this.playQueue.add(
            {
              payload: 'hello',
            },
            {
              delay: 100,
              // removeOnComplete: true,
              // removeOnFail: false,
              // backoff: 3,
              attempts: 4,
            },
          );
        return true
    }

    @Mutation(() => Boolean)
    __name__(kebabCase)Mutation() {
        return true
    }

}