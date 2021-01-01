import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSSR } from 'use-ssr';

import './project-page.css';

import { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProject } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Alert } from '../../components/alert/alert';
import { Spinner } from '../../components/spinner/spinner';
import { ProjectView } from '../../components/project-view/project-view';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';

type PageParams = { id: string };

const cls = bemClassName('project-page');

export const ProjectPage: FC<Project> = () => {
  const params = useParams<PageParams>();
  const initialData = useContext(InitialDataContext);
  const { isBrowser, isServer } = useSSR();
  let initialState = null;

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  const [project, setProject] = useState<Project>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialState) {
      return;
    }

    setLoading(true);

    ProjectPage.fetchInitialData(params)
      .then(setProject)
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

      {!loading && !error && project && (
        <ProjectView
          className={cls('project-view')}
          project={project}
        />
      )}
    </div>
  );
};

ProjectPage.fetchInitialData = (params: PageParams) => {
  return fetchProject(Number(params.id));
};
