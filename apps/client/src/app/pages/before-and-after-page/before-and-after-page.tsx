import React from 'react';

import './before-and-after-page.css';

import type { PagedResponse, BeforeAndAfter } from '@lyubimovstudio/api-interfaces';

import { fetchBeforeAndAfter } from '../../api';
import { bemClassName } from '../../utils/helpers';
import { Spinner } from '../../components/spinner/spinner';
import { FC } from '../../utils/types';
import { BeforeAndAfterView } from '../../components/before-and-after-view/before-and-after-view';
import { LoadMoreButton } from '../../components/load-more-button/load-more-button';
import { useInitialState, usePagedEntities } from '../../utils/hooks';

const cls = bemClassName('before-and-after-page');

export const BeforeAndAfterPage: FC<PagedResponse<BeforeAndAfter>> = () => {
  const initialState = useInitialState<PagedResponse<BeforeAndAfter>>({ rows: [], total: 0 });
  const {
    loading,
    isLoadMoreShown,
    entities: beforeAndAfter,
    onLoadMoreClick,
  } = usePagedEntities({
    initialTotal: initialState.total,
    initialEntities: initialState.rows,
    loadingErrorText: 'Произошла ошибка при загрузке "До И После"',
    fetchInitialData: BeforeAndAfterPage.fetchInitialData,
    fetchEntities: fetchBeforeAndAfter,
  });

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

      {!isLoadMoreShown && (
        <LoadMoreButton
          className={cls('load-more-button')}
          disabled={loading}
          onClick={onLoadMoreClick}
        />
      )}
    </div>
  );
};

BeforeAndAfterPage.fetchInitialData = () => {
  return fetchBeforeAndAfter();
};
