import React, { Fragment, FunctionComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { convertUrlSearchParamsToObject } from '../../utils/helpers';
import { HelmetRouteProps } from '../../utils/types';

type Props = HelmetRouteProps;
location
export const HelmetRoute: FunctionComponent<Props> = (props) => {
  const { title, component: ComponentToRender, ...routeProps } = props;
  const routeRender = (props: RouteComponentProps<any>) => {
    const queryParams = new URLSearchParams(props.location.search);
    const computedTitle = (typeof title === 'string')
      ? title
      : title(convertUrlSearchParamsToObject(queryParams));

    return (
      <Fragment>
        <Helmet>
          <title>{computedTitle}</title>
        </Helmet>

        <ComponentToRender {...props}/>
      </Fragment>
    );
  };

  return <Route {...routeProps} render={routeRender}/>;
};

