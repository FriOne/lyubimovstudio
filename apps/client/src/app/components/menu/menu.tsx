import React, { FunctionComponent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import './menu.css';

import { bemClassName } from '../../utils/helpers';

export type Link = {
  to: string;
  children: ReactNode;
};

type Props = {
  className?: string;
  links: Link[];
};

const cls = bemClassName('menu');

export const Menu: FunctionComponent<Props> = (props) => {
  const { className = '', links } = props;

  return (
    <div className={cls(null, [className])}>
      {links.map(link => (
        <NavLink
          key={link.to}
          className={cls('link')}
          activeClassName={cls('link', { active: true })}
          {...link}
        />
      ))}
    </div>
  );
};
