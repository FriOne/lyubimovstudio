import React from 'react';
import { hydrate, render } from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import { hydrateRoot } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/app';
import { InitialDataContext } from './app/initial-data-context';

const root = document.getElementById('root');

if (root) {
  const method = root.hasChildNodes() ? hydrate : render;

  method(
    <React.StrictMode>
      <InitialDataContext.Provider value={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InitialDataContext.Provider>
    </React.StrictMode>,
    root,
  );
} else {
  throw new Error('No root element in DOM');
}
