import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSSR } from 'use-ssr';

import './before-and-after-page.css';

import { PagedResponse, BeforeAndAfter } from '@lyubimovstudio/api-interfaces';

import { fetchBeforeAndAfter } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { Alert } from '../../components/alert/alert';
import { FC } from '../../utils/types';
import { InitialDataContext } from '../../../initial-data-context';
import { BeforeAndAfterView } from '../../components/before-and-after-view/before-and-after-view';

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

  const [beforeAndAfter, setBeforeAndAfter] = useState<BeforeAndAfter[]>(initialState.rows);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialState.rows.length > 0) {
      return;
    }

    setLoading(true);

    BeforeAndAfterPage.fetchInitialData()
      .then(({ rows }) => setBeforeAndAfter(rows))
      .catch(setError)
      .then(() => setLoading(false));
  }, []);

  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        До и После
      </h1>

      {error && (
        <Alert className={cls('error')}>
          {error.message}
        </Alert>
      )}

      {loading && (
        <Spinner className={cls('spinner')}/>
      )}

      {!loading && !error && beforeAndAfter.map(singleBeforeAndAfter => (
        <BeforeAndAfterView
          className={cls('before-and-after-view')}
          beforeAndAfter={singleBeforeAndAfter}
        />
      ))}
    </div>
  );
};

BeforeAndAfterPage.fetchInitialData = (params: unknown) => {
  return fetchBeforeAndAfter();
};
