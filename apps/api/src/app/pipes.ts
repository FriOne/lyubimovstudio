import { createParamDecorator, DefaultValuePipe, ExecutionContext, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';

export const IntParam = (name: string) => Param(
  name,
  new DefaultValuePipe('0'),
  ParseIntPipe,
);

export const IntQuery = (name: string) => Query(
  name,
  new DefaultValuePipe(0),
  new ParseIntPipe()
);

export const BooleanQuery = (name: string) => Query(
  name,
  new ParseBoolPipe()
);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
