import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    const userRef = ctx.req?.user;

    return userRef ? JSON.parse(JSON.stringify(userRef)) : null;
  },
);
