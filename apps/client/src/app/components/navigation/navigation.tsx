import React, { FunctionComponent, ReactNode, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { bemClassName } from '../../utils/helpers';
import { HamburgerButton } from './hamburger-button/hamburger-button';
import { ReactComponent as PhoneSvg } from './phone.svg';

import './navigation.css';

export type Link = {
  to: string;
  children: ReactNode;
};

type Props = {
  className?: string;
  links: Link[];
};

const cls = bemClassName('navigation');

export const Navigation: FunctionComponent<Props> = (props) => {
  const { className = '', links } = props;
  const [opened, setOpened] = useState(false);

  const onTogglerClick = useCallback(() => setOpened(!opened), [opened, setOpened]);
  const onLinkClick = useCallback(() => setOpened(false), [setOpened]);

  return (
    <nav className={cls({ opened }, [className])}>
      <div className={cls('sidenav')}>
        <div className={cls('menu')}>
          {links.map(link => (
            <NavLink
              key={link.to}
              className={cls('link')}
              activeClassName={cls('link', { active: true })}
              onClick={onLinkClick}
              {...link}
            />
          ))}
        </div>

        <HamburgerButton
          className={cls('toggler')}
          active={opened}
          onClick={onTogglerClick}
        />
      </div>

      <div className={cls('fake')}/>

      <a
        className={cls('phone')}
        href="tel:+79139006019"
      >
        <PhoneSvg className={cls('phone-image')}/>
        <span className={cls('phone-number')}>
          8-913-900-6019
        </span>
      </a>
    </nav>
  );
};
