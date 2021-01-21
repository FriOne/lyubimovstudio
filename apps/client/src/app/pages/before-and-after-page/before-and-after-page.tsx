import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { useSSR } from 'use-ssr';

import './before-and-after-page.css';

import { PagedResponse, BeforeAndAfter } from '@lyubimovstudio/api-interfaces';

import { fetchBeforeAndAfter } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';
import { BeforeAndAfterView } from '../../components/before-and-after-view/before-and-after-view';
import { LoadMoreButton } from '../../components/load-more-button/load-more-button';

const cls = bemClassName('before-and-after-page');

export const BeforeAndAfterPage: FC<PagedResponse<BeforeAndAfter>> = () => {
  const location = useLocation();
  const initialData = useContext(InitialDataContext);
  const { isBrowser, isServer } = useSSR();

  let initialState = { rows: [], total: 0 };

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialState.total);
  const [beforeAndAfter, setBeforeAndAfter] = useState<BeforeAndAfter[]>(initialState.rows);
  const [loading, setLoading] = useState(false);

  const onLoadMoreClick = useCallback(async () => {
    setLoading(true);

    const { rows, total } = await fetchBeforeAndAfter(page);

    setPage(page + 1);
    setBeforeAndAfter([...beforeAndAfter, ...rows]);
    setTotal(total);
    setLoading(false);
  }, [page, beforeAndAfter]);

  useEffect(() => {
    if (initialState.rows.length > 0) {
      return;
    }

    setLoading(true);

    BeforeAndAfterPage.fetchInitialData()
      .then(({ rows, total }) => {
        setTotal(total);
        setBeforeAndAfter(rows);
      })
      .catch(() => toast.error('Произошла ошибка при загрузке "До И После"'))
      .then(() => setLoading(false));
  // eslint-disable-next-line
  }, []);

  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        До и После
      </h1>

      {!loading && beforeAndAfter.map((singleBeforeAndAfter) => (
        <BeforeAndAfterView
          key={singleBeforeAndAfter.id}
          className={cls('before-and-after-view')}
          beforeAndAfter={singleBeforeAndAfter}
        />
      ))}

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && total > beforeAndAfter.length && (
        <LoadMoreButton
          className={cls('load-more-button')}
          disabled={loading}
          onClick={onLoadMoreClick}
        />
      )}
    </div>
  );
};

BeforeAndAfterPage.fetchInitialData = (params: unknown) => {
  return fetchBeforeAndAfter();
};
