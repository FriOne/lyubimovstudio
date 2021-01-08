import React from 'react';

import { Navigation } from './navigation';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: Navigation,
  title: 'Navigation',
};

const links = [
  { to: '/', children: 'Home' },
  { to: '/projects', children: 'Projects' },
];

export const primary = () => {
  return (
    <BrowserRouter>
      <Navigation links={links}/>
    </BrowserRouter>
  );
};
