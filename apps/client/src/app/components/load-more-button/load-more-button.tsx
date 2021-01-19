import React, { DetailedHTMLProps, FunctionComponent } from 'react';

import './load-more-button.css';

import { bemClassName } from '../../utils/helpers';

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const cls = bemClassName('load-more-button');

export const LoadMoreButton: FunctionComponent<Props> = (props) => {
  const { className = '', ...restProps} = props;

  return (
    <button className={cls(null, [className])} {...restProps}>
      Подгрузить еще
    </button>
  );
}
