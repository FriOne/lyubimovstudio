import React, { useMemo } from 'react';
import { Switch } from 'react-router-dom';

import './app.css';

import { bemClassName } from './utils/helpers';
import { Link, Navigation } from './components/navigation/navigation';
import { routes } from './routes';
import { HelmetRoute } from './components/helmet-route/helmet-route';

const cls = bemClassName('app');
const links: Link[] = [
  { to: '/projects', children: 'Проекты' },
  { to: '/portfolio', children: 'Портфолио' },
  { to: '/about', children: 'О компании' },
];

export function App() {
  const links: Link[] = useMemo(() => {
    return routes
      .filter(route => route.navTitle)
      .map(route => ({
        to: route.path,
        children: route.navTitle,
      }));
  }, []);

  return (
    <div className={cls()}>
      <Navigation
        className={cls('navigation')}
        links={links}
      />

      <div className={cls('content')}>
        <Switch>
          {routes.map(route => <HelmetRoute key={route.path} {...route}/>)}
        </Switch>
      </div>
    </div>
  );
}

export default App;
