import React, { FunctionComponent, memo } from 'react';
import { Helmet } from 'react-helmet';

import './not-found-page.css';

import { bemClassName, getTitleByKey } from '../../utils/helpers';

const cls = bemClassName('not-found-page');

export const NotFoundPage: FunctionComponent = memo(() => {
  return (
    <div className={cls()}>
      <Helmet>
        <title>{getTitleByKey('404')}</title>
      </Helmet>

      <div className={cls('404')}>
        404
      </div>

      <div className={cls('text')}>
        Страница не найдена
      </div>
    </div>
  );
}, () => true);
