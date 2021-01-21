import React, { FunctionComponent, memo } from 'react';

import './spinner.css';

import { bemClassName } from '../../utils/helpers';
import { ReactComponent as SpinnerSvg } from './spinner.svg';

type Props = {
  className?: string;
};

const cls = bemClassName('spinner');

export const Spinner: FunctionComponent<Props> = memo((props) => {
  const { className = '' } = props;

  return (
    <SpinnerSvg className={cls(null, [className])}/>
  )
});
