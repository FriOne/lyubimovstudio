import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { AboutPage } from './pages/about-page/about-page';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';
import { HelmetRouteProps } from './utils/types';
import { BeforeAndAfterPage } from './pages/before-and-after-page/before-and-after-page';

export const routes: HelmetRouteProps[] = [
    {
      exact: true,
      path: '/projects',
      component: HomePage,
      title: 'LyubimovStudio | Проекты',
      navTitle: 'Проекты',
    },
    {
      exact: true,
      path: '/projects/:id',
      component: ProjectPage,
      title: 'LyubimovStudio | Проекты',
    },
    {
      exact: true,
      path: '/portfolio',
      component: PortfolioPage,
      title(queryParams: Record<string, string>) {
        const tagPart = queryParams.tagName ? ` - ${queryParams.tagName}` : '';

        return `LyubimovStudio | Портфолио${tagPart}`
      },
      navTitle: 'Портфолио',
    },
    {
      exact: true,
      path: '/before-and-after',
      component: BeforeAndAfterPage,
      title: 'LyubimovStudio | До и После',
      navTitle: 'До и После',
    },
    {
      exact: true,
      path: '/about',
      component: AboutPage,
      title: 'LyubimovStudio | О компании',
      navTitle: 'О компании',
    },
];
