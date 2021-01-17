import React, { FunctionComponent } from 'react';

import './privacy-page.css';

import privacyText from './privacy.txt';

import { bemClassName } from '../../utils/helpers';

const cls = bemClassName('privacy-page');

export const PrivacyPage: FunctionComponent = () => {
  return (
    <div className={cls()}>
      <h1 className={cls('title')}>
        Политика в отношении обработки персональных данных
      </h1>

      {privacyText}
    </div>
  );
};
