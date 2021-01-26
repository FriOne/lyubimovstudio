import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useSSR from 'use-ssr';
import { toast } from 'react-toastify';

import { PagedResponse } from '@lyubimovstudio/api-interfaces';

import { InitialDataContext } from '../initial-data-context';

export type InitialEntitySettings<Entity, PageParams = unknown> = {
  initialEntity: Entity | null;
  loadingErrorText: string;
  fetchInitialData(params: PageParams): Promise<Entity>;
  beforeShow?(entity: Entity): Promise<unknown>;
};

export type PagedEntitiesSettings<Entity> = {
  initialTotal: number;
  initialEntities: Entity[];
  loadingErrorText: string;
  fetchEntities(page: number): Promise<PagedResponse<Entity>>;
  fetchInitialData(): Promise<PagedResponse<Entity>>;
};

export function useInitialState<T>(defaultValue: T): T {
  const { isBrowser, isServer } = useSSR();
  const initialData = useContext(InitialDataContext);
  let initialState = defaultValue;

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  return initialState;
}

export function useUrlSearchParams() {
  const location = useLocation();

  return useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
}

export function useInitialEntity<Entity, PageParams>(settings: InitialEntitySettings<Entity, PageParams>) {
  const {
    initialEntity,
    loadingErrorText,
    fetchInitialData,
    beforeShow,
  } = settings;

  const params = useParams<PageParams>();
  const [entity, setEntity] = useState(initialEntity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialEntity) {
      return;
    }

    setLoading(true);

    fetchInitialData(params)
      .then((project) => {
        setEntity(project);

        return project;
      })
      .then(beforeShow)
      .catch(() => toast.error(loadingErrorText))
      .then(() => setLoading(false));
  // eslint-disable-next-line
  }, []);

  return {
    entity,
    loading,
  }
}

export function usePagedEntities<Entity>(settings: PagedEntitiesSettings<Entity>) {
  const {
    initialTotal,
    initialEntities,
    loadingErrorText,
    fetchEntities,
    fetchInitialData,
  } = settings;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialTotal);
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [loading, setLoading] = useState(false);

  const onLoadMoreClick = useCallback(async () => {
    setLoading(true);

    const { rows, total } = await fetchEntities(page);

    setPage(page + 1);
    setEntities([...entities, ...rows]);
    setTotal(total);
    setLoading(false);
  }, [page, entities, fetchEntities]);

  useEffect(() => {
    if (initialEntities.length > 0) {
      return;
    }

    setLoading(true);

    fetchInitialData()
      .then(({ rows, total }) => {
        setEntities(rows);
        setTotal(total);
      })
      .catch(() => toast.error(loadingErrorText))
      .then(() => setLoading(false));
  // eslint-disable-next-line
  }, []);

  return {
    loading,
    page,
    entities,
    isLoadMoreShown: !loading && (total > entities.length),
    onLoadMoreClick,
  };
}
