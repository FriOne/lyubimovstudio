import { HomePage } from './pages/home-page/home-page';
import { ProjectPage } from './pages/project-page/project-page';
import { AboutPage } from './pages/about-page/about-page';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';

export const routes = [
    { exact: true, path: '/projects', component: HomePage },
    { exact: true, path: '/projects/:id', component: ProjectPage },
    { exact: true, path: '/portfolio', component: PortfolioPage },
    { exact: true, path: '/about', component: AboutPage },
];
