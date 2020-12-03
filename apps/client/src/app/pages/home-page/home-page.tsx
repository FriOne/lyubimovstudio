import React, { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router';

import './home-page.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { useProjects } from './home-page.hooks';
import { bemClassName } from '../../utils/helpers';
import { ProjectsGallery } from '../../components/projects-gallery/projects-gallery';
import { Spinner } from '../../components/spinner/spinner';
import { Alert } from '../../components/alert/alert';

const cls = bemClassName('home-page');

export const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { loading, error, projects } = useProjects();

  const onProjectClick = useCallback((project: Project) => {
    navigate(`/projects/${project.id}`);
  }, []);

  return (
    <div className={cls()}>
      {error && (
        <Alert className={cls('error')}>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && !error && (
        <ProjectsGallery
          className={cls('gallery')}
          projects={projects}
          onProjectClick={onProjectClick}
        />
      )}
    </div>
  );
};
