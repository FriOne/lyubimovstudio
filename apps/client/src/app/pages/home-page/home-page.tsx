import React, { useContext, useEffect, useState } from 'react';
import { useSSR } from 'use-ssr';

import './home-page.css';

import { PagedResponse, Project } from '@lyubimovstudio/api-interfaces';

import { fetchProjects } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { ProjectsGallery } from '../../components/projects-gallery/projects-gallery';
import { Spinner } from '../../components/spinner/spinner';
import { Alert } from '../../components/alert/alert';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';

const cls = bemClassName('home-page');

export const HomePage: FC<PagedResponse<Project>> = () => {
  const initialData = useContext(InitialDataContext);
  const { isBrowser , isServer} = useSSR();
  let initialState = [];

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__.rows;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData.rows;
  }

  const [projects, setProjects] = useState<Project[]>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialState.length > 0) {
      return;
    }

    setLoading(true);

    HomePage.fetchInitialData()
      .then(({ rows }) => setProjects(rows))
      .catch(setError)
      .then(() => setLoading(false));
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
        />
      )}
    </div>
  );
};

HomePage.fetchInitialData = () => {
  return fetchProjects();
};
