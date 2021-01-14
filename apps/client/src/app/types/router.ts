import { RouteProps } from 'react-router-dom';

export type HelmetRouteProps = RouteProps & {
  title: string;
  path: string;
};
