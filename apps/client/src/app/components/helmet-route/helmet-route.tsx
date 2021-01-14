import React, { Fragment, FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { HelmetRouteProps } from '../../types/router';

type Props = HelmetRouteProps;

export const HelmetRoute: FunctionComponent<Props> = (props) => {
  const { title, component: ComponentToRender, ...routeProps } = props;
  const routeRender = (props: RouteComponentProps<any>) => (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <ComponentToRender {...props}/>
    </Fragment>
  );

  return <Route {...routeProps} render={routeRender}/>;
};

