import React from 'react';

import './home-page.css';

import type { PagedResponse, Project } from '@lyubimovstudio/api-interfaces';

import { fetchProjects } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { ProjectsGallery } from '../../components/projects-gallery/projects-gallery';
import { Spinner } from '../../components/spinner/spinner';
import { FC } from '../../utils/types';
import { LoadMoreButton } from '../../components/load-more-button/load-more-button';
import { useInitialState, usePagedEntities } from '../../utils/hooks';

const cls = bemClassName('home-page');

export const HomePage: FC<PagedResponse<Project>> = () => {
  const initialState = useInitialState<PagedResponse<Project>>({ rows: [], total: 0 });
  const {
    loading,
    isLoadMoreShown,
    entities: projects,
    onLoadMoreClick,
  } = usePagedEntities({
    initialTotal: initialState.total,
    initialEntities: initialState.rows,
    loadingErrorText: 'Произошла ошибка при загрузке проектов',
    fetchInitialData: HomePage.fetchInitialData,
    fetchEntities: fetchProjects,
  });

  return (
    <div className={cls()}>
      <ProjectsGallery
        className={cls('gallery')}
        projects={projects}
      />

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {isLoadMoreShown && (
        <LoadMoreButton
          className={cls('load-more-button')}
          disabled={loading}
          onClick={onLoadMoreClick}
        />
      )}
    </div>
  );
};

HomePage.fetchInitialData = () => {
  return fetchProjects();
};
