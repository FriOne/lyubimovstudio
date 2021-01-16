import { FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

type InitialFetch<Response> = { fetchInitialData(params?: Record<string, string>, queryParams?: Record<string, string>): Promise<Response>; };

export type FC<Response, Props = {}> = FunctionComponent<Props> & InitialFetch<Response>;

type titleFn = (queryParams: Record<string, string>) => string;

export type HelmetRouteProps = RouteProps & {
  title: string | titleFn;
  navTitle?: string;
  path: string;
};
