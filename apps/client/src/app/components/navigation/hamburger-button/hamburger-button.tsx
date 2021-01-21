import React, { FunctionComponent, memo } from 'react';

import './hamburger-button.css';

import { bemClassName } from '../../../utils/helpers';

type Props = {
  className?: string;
  active: boolean;
  onClick(): void;
};

const cls = bemClassName('hamburger-button');

export const HamburgerButton: FunctionComponent<Props> = memo((props) => {
  const { className = '', active = false, onClick } = props;

  return (
    <button
      className={cls({ active }, [className])}
      aria-controls="navigation"
      onClick={onClick}
    >
        <span className={cls('box')}>
          <span className={cls('inner')}/>
        </span>
    </button>
  );
});
