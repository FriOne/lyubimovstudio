import React, { DetailedHTMLProps, FunctionComponent, memo } from 'react';

import './load-more-button.css';

import { bemClassName } from '../../utils/helpers';

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const cls = bemClassName('load-more-button');

export const LoadMoreButton: FunctionComponent<Props> = memo((props) => {
  const { className = '', ...restProps} = props;

  return (
    <button className={cls(null, [className])} {...restProps}>
      Подгрузить еще
    </button>
  );
});
