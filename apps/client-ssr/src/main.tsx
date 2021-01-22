import express, { Request, Response } from 'express';
import { promisify } from 'util';
import { renderToStaticNodeStream } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import React from 'react';
import fs from 'fs';
import fetch from 'node-fetch';

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { routes } from './../../client/src/app/routes';
import { App } from './../../client/src/app/app';
import { FC } from './../../client/src/app/utils/types';
import { InitialDataContext } from './../../client/src/app/initial-data-context';
/* eslint-enable @nrwl/nx/enforce-module-boundaries */

import { getHtmlPageStartAndEnd } from './html';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fetch = fetch as any;

const readFile = promisify(fs.readFile);

const port = process.env.PORT || 4444;
const clientHtmlFile = process.env.CLIENT_HTML_FILE;

if (!clientHtmlFile) {
  throw new Error('Client html file was not provided, use CLIENT_HTML_FILE env variable!');
}

initServer();

async function initServer() {
  const assets = await getIndexHtmlAssets(clientHtmlFile);

  const app = express();

  app.get('*', getSSRRoute(assets));

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', console.error);
}

async function getIndexHtmlAssets(file) {
  const clientHtmlBuffer = readFile(file);
  const clientHtml = (await clientHtmlBuffer).toString();

  const scripts = /<script.*<\/script>/.exec(clientHtml).join('');
  const stylesheets = /<link.*rel="stylesheet".*>/.exec(clientHtml).join('');

  return { scripts, stylesheets };
}

function getSSRRoute(assets: { scripts: string, stylesheets: string }) {
  return async (req: Request, res: Response) => {
    let currentRoute = null;
    let currentRouteMatch = null;

    for (const route of routes) {
      const match = matchPath(req.url, route);

      if (match) {
        currentRoute = route;
        currentRouteMatch = match;
      }
    }

    let initialData: unknown;
    const fetchInitialData = (currentRoute?.component as FC<unknown>)?.fetchInitialData;

    if (fetchInitialData) {
      try {
        initialData = await fetchInitialData(currentRouteMatch.params, req.query as Record<string, string>);
      }
      catch (error) {
        console.error(error);

        return res.sendStatus(500);
      }
    }

    const routeTitle = currentRoute?.title || 'LyubimovStudio';
    const title = (typeof routeTitle === 'string')
      ? routeTitle
      : routeTitle(req.query)

    const { scripts, stylesheets } = assets;
    const [hrmlPageStart, htmlPageEnd] = getHtmlPageStartAndEnd({
       title,
       scripts,
       stylesheets,
       initialData,
    });

    res.status(currentRoute?.path ? 200 : 404);
    res.write(hrmlPageStart);

    const stream = renderToStaticNodeStream(
      <InitialDataContext.Provider value={initialData}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </InitialDataContext.Provider>
    );

    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.write(htmlPageEnd);
      res.end();
    });
  };
}
