import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

import './app.css';

import { bemClassName } from './utils/helpers';
import { Link, Navigation } from './components/navigation/navigation';
import { routes } from './routes';

const cls = bemClassName('app');
const links: Link[] = [
  { to: '/projects', children: 'Проекты' },
  { to: '/portfolio', children: 'Портфолио' },
  { to: '/about', children: 'О компании' },
];

export function App() {
  return (
    <div className={cls()}>
      <Helmet>
        <title>LyubimovStudio</title>
      </Helmet>

      <Navigation
        className={cls('navigation')}
        links={links}
      />

      <div className={cls('content')}>
        <Switch>
          {routes.map(route => <Route key={route.path} {...route}/>)}
        </Switch>
      </div>
    </div>
  );
}

export default App;
