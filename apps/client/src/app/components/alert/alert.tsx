import React, { FunctionComponent } from 'react';

import './alert.css';

import { bemClassName } from '../../utils/helpers';

type Props = {
  className?: string;
};

const cls = bemClassName('alert');

export const Alert: FunctionComponent<Props> = (props) => {
  const { className = '', children } = props;

  return (
    <div className={cls(null, [className])}>
      {children}
    </div>
  )
};
