import React from 'react';
import { Helmet } from 'react-helmet';

import './project-page.css';

import type { Project } from '@lyubimovstudio/api-interfaces';

import { fetchProject } from '../../api';
import { bemClassName, getTitleByKey, loadPicture } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { ProjectView } from '../../components/project-view/project-view';
import { FC } from '../../utils/types';
import { useInitialEntity, useInitialState } from '../../utils/hooks';

type PageParams = { id: string };

const cls = bemClassName('project-page');

export const ProjectPage: FC<Project> = () => {
  const initialState = useInitialState<Project | null>(null);
  const {
    loading,
    entity: project,
  } = useInitialEntity({
    initialEntity: initialState,
    loadingErrorText: 'Произошла ошибка при загрузке проекта',
    fetchInitialData: ProjectPage.fetchInitialData,
    beforeShow: (project) => loadPicture(project.pictures[0].image),
  });

  return (
    <div className={cls()}>
      <Helmet>
        <title>{getTitleByKey('projects')}</title>
      </Helmet>

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
