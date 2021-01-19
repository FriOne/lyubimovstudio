import { DefaultValuePipe, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';

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
  new DefaultValuePipe(false),
  new ParseBoolPipe()
);
