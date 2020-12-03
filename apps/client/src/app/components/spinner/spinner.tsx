import React, { FunctionComponent } from 'react';

import './spinner.css';

import { bemClassName } from '../../utils/helpers';

type Props = {
  className?: string;
};

const cls = bemClassName('spinner');

export const Spinner: FunctionComponent<Props> = (props) => {
  const { className = '' } = props;

  return <div className={cls(null, [className])}/>
};
