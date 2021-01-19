import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSSR } from 'use-ssr';

import './home-page.css';

import { PagedResponse, Project } from '@lyubimovstudio/api-interfaces';

import { fetchProjects } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { ProjectsGallery } from '../../components/projects-gallery/projects-gallery';
import { Spinner } from '../../components/spinner/spinner';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';
import { LoadMoreButton } from '../../components/load-more-button/load-more-button';

const cls = bemClassName('home-page');

export const HomePage: FC<PagedResponse<Project>> = () => {
  const initialData = useContext(InitialDataContext);
  const { isBrowser , isServer } = useSSR();
  let initialState = { rows: [], total: 0 };

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialState.total);
  const [projects, setProjects] = useState<Project[]>(initialState.rows);
  const [loading, setLoading] = useState(false);

  const onLoadMoreClick = useCallback(async () => {
    setLoading(true);

    const { rows, total } = await fetchProjects(page);

    setPage(page + 1);
    setProjects([...projects, ...rows]);
    setTotal(total);
    setLoading(false);
  }, [page, projects]);

  useEffect(() => {
    if (initialState.rows.length > 0) {
      return;
    }

    setLoading(true);

    HomePage.fetchInitialData()
      .then(({ rows, total }) => {
        setProjects(rows);
        setTotal(total);
      })
      .catch(() => toast.error('Произошла ошибка при загрузке проектов'))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className={cls()}>
      <ProjectsGallery
        className={cls('gallery')}
        projects={projects}
      />

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && total > projects.length && (
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
