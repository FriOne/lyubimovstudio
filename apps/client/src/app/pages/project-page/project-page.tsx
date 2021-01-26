import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import './project-page.css';

import type { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProject } from '../../api';
import { bemClassName, loadPicture } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { ProjectView } from '../../components/project-view/project-view';
import { FC } from '../../utils/types';
import { useInitialState } from '../../utils/hooks';

type PageParams = { id: string };

const cls = bemClassName('project-page');

export const ProjectPage: FC<Project> = () => {
  const params = useParams<PageParams>();
  const initialState = useInitialState<Project | null>(null);

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
