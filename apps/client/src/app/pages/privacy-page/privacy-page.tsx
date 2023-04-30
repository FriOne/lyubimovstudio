import React, { FunctionComponent, memo } from 'react';
import { Helmet } from 'react-helmet';

import './privacy-page.css';

import privacyText from './privacy.txt';

import { bemClassName, getTitleByKey } from '../../utils/helpers';

const cls = bemClassName('privacy-page');

export const PrivacyPage: FunctionComponent = memo(() => {
  return (
    <div className={cls()}>
      <Helmet>
        <title>{getTitleByKey('projects')}</title>
      </Helmet>

      <h1 className={cls('title')}>
        Политика в отношении обработки персональных данных
      </h1>

      {privacyText}
    </div>
  );
}, () => true);
