import { RouteProps } from 'react-router-dom';

import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { AboutPage } from './pages/about-page/about-page';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';
import { BeforeAndAfterPage } from './pages/before-and-after-page/before-and-after-page';
import { PrivacyPage } from './pages/privacy-page/privacy-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

type RouteWithTitle = RouteProps & {
  key: string;
  title: string | ((queryParams: Record<string, string>) => string);
};

const rootRoute = {
  key: 'projects',
  path: '/projects',
  element: <HomePage />,
  Component: HomePage,
  title: 'LyubimovStudio | Проекты',
};

export const routesWithTitle: RouteWithTitle[] = [
  { ...rootRoute, path: '/' },
  rootRoute,
  {
    key: 'selected-project',
    path: '/projects/:id',
    element: <ProjectPage />,
    Component: ProjectPage,
    title: 'LyubimovStudio | Проекты',
  },
  {
    key: 'portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
    Component: PortfolioPage,
    title(queryParams: Record<string, string>) {
      const tagPart = queryParams.tagName ? ` - ${queryParams.tagName}` : '';

      return `LyubimovStudio | Портфолио${tagPart}`
    },
  },
  {
    key: 'before-and-after',
    path: '/before-and-after',
    element: <BeforeAndAfterPage />,
    Component: BeforeAndAfterPage,
    title: 'LyubimovStudio | До и После',
  },
  {
    key: 'about',
    path: '/about',
    element: <AboutPage />,
    Component: AboutPage,
    title: 'LyubimovStudio | О компании',
  },
  {
    key: 'privacy',
    path: '/privacy',
    element: <PrivacyPage />,
    Component: PrivacyPage,
    title: 'LyubimovStudio | Политика кофиденциальности',
  },
  {
    key: '404',
    element: <NotFoundPage />,
    Component: NotFoundPage,
    title: 'LyubimovStudio | 404',
  },
];

export const routes: RouteProps[] = routesWithTitle.map(({ key, title, ...rest }) => rest);

export const navLinks = [
  { to: '/projects', title: 'Проекты' },
  { to: '/portfolio', title: 'Портфолио' },
  { to: '/before-and-after', title: 'До и После' },
  { to: '/about', title: 'О компании' },
];

export function getRouteTitleByKey(key: string) {
  const routeWithTitle = routesWithTitle.find((route) => (route.key === key));

  return routeWithTitle ? routeWithTitle.title : '';
}
