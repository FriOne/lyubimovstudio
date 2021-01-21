import React, { FunctionComponent, memo } from 'react';

import './privacy-page.css';

import privacyText from './privacy.txt';

import { bemClassName } from '../../utils/helpers';

const cls = bemClassName('privacy-page');

export const PrivacyPage: FunctionComponent = memo(() => {
  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        Политика в отношении обработки персональных данных
      </h1>

      {privacyText}
    </div>
  );
}, () => true);
