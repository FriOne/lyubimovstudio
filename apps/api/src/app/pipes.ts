import { DefaultValuePipe, Param, ParseIntPipe, Query } from '@nestjs/common';

export const IntParam = (name: string) => Param(name, ParseIntPipe);
export const IntQuery = (name: string) => Query(
  name,
  new DefaultValuePipe(0),
  new ParseIntPipe()
);
