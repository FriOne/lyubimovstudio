import React, { DetailedHTMLProps, FunctionComponent, memo } from 'react';

import './checkbox.css';

import { bemClassName } from '../../utils/helpers';

type Props = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const cls = bemClassName('checkbox');

export const Checkbox: FunctionComponent<Props> = memo((props) => {
  const { className = '', children, checked, ...restProps } = props;

  return (
    <label className={cls({ checked }, [className])}>
      <input
        {...restProps}
        className={cls('input')}
        type="checkbox"
        checked={checked}
      />

      {children}
    </label>
  );
});
