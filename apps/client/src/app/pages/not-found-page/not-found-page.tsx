import React, { FunctionComponent, memo } from 'react';

import './not-found-page.css';

import { bemClassName } from '../../utils/helpers';

const cls = bemClassName('not-found-page');

export const NotFoundPage: FunctionComponent = memo(() => {
  return (
    <div className={cls()}>
      <div className={cls('404')}>
        404
      </div>

      <div className={cls('text')}>
        Страница не найдена
      </div>
    </div>
  );
}, () => true);
