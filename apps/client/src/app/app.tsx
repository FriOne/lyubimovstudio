import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

import { bemClassName } from './utils/helpers';
import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { Link, Navigation } from './components/navigation/navigation';
import { AboutPage } from './pages/about-page/about-page';

const cls = bemClassName('app');
const links: Link[] = [
  { to: '/projects', children: 'Проекты' },
  { to: '/about', children: 'О компании' },
];

export function App() {
  return (
    <div className={cls()}>
      <Navigation
        className={cls('navigation')}
        links={links}
      />

      <div className={cls('content')}>
        <Switch>
          <Redirect exact from="/" to="projects"/>
          <Route exact path="/projects" component={HomePage}/>
          <Route exact path="/projects/:id" component={ProjectPage}/>
          <Route exact path="/about" component={AboutPage}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
