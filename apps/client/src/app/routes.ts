import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { AboutPage } from './pages/about-page/about-page';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';
import { HelmetRouteProps } from './types/router';

export const routes: HelmetRouteProps[] = [
    {
      exact: true,
      path: '/projects',
      component: HomePage,
      title: 'LyubimovStudio',
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
      title: 'LyubimovStudio | Портфолио',
    },
    {
      exact: true,
      path: '/about',
      component: AboutPage,
      title: 'LyubimovStudio | Контакты',
    },
];
