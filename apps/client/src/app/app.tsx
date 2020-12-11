import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './app.css';

import { bemClassName } from './utils/helpers';
import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { Link, Navigation } from './components/navigation/navigation';

const cls = bemClassName('app');
const links: Link[] = [
  { to: '/', children: 'Проекты' },
];

export function App() {
  return (
    <div className={cls()}>
      <Navigation
        className={cls('navigation')}
        links={links}
      />

      <div className={cls('content')}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="projects" element={<HomePage />}/>
          <Route path="projects/:id" element={<ProjectPage />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
