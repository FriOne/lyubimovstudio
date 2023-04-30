import { FunctionComponent } from 'react';
import { Params } from 'react-router';

type InitialFetch<Response> = { fetchInitialData(params?: Params, queryParams?: Record<string, string>): Promise<Response>; };

// Rule is here because need tot copy react rule
// eslint-disable-next-line @typescript-eslint/ban-types
export type FC<Response, Props = {}> = FunctionComponent<Props> & InitialFetch<Response>;
