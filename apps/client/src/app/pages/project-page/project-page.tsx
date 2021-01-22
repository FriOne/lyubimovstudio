import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSSR } from 'use-ssr';
import { toast } from 'react-toastify';

import './project-page.css';

import type { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProject } from '../../api';
import { InitialDataContext } from '../../initial-data-context';
import { bemClassName, loadPicture } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { ProjectView } from '../../components/project-view/project-view';
import { FC } from '../../utils/types';

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

  useEffect(() => {
    if (initialState) {
      return;
    }

    setLoading(true);

    ProjectPage.fetchInitialData(params)
      .then((project) => {
        setProject(project);

        return project;
      })
      .then((project) => loadPicture(project.pictures[0].image))
      .catch(() => toast.error('Произошла ошибка при загрузке проекта'))
      .then(() => setLoading(false));
  // eslint-disable-next-line
  }, []);

  return (
    <div className={cls()}>
      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && project && (
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
