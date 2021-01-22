import React, { FunctionComponent, ReactNode, memo, useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { environment } from '../../../environments/environment';
import { bemClassName } from '../../utils/helpers';
import { HamburgerButton } from './hamburger-button/hamburger-button';
import { PhoneNumber } from './phone-number/phone-number';

import './navigation.css';

export type Link = {
  to: NavLinkProps['to'];
  children: NavLinkProps['children'];
  isActive: NavLinkProps['isActive'];
};

type Props = {
  className?: string;
  links: Link[];
};

const cls = bemClassName('navigation');

export const Navigation: FunctionComponent<Props> = memo((props) => {
  const { className = '', links } = props;
  const [opened, setOpened] = useState(false);

  const onTogglerClick = useCallback(() => setOpened(!opened), [opened, setOpened]);
  const onLinkClick = useCallback(() => setOpened(false), [setOpened]);

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (ref.current.contains(event.target as HTMLElement)) {
        return;
      }

      setOpened(false);
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return (
    <nav className={cls({ opened }, [className])}>
      <div className={cls('sidenav')} ref={ref}>
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

      <PhoneNumber
        className={cls('phone')}
        phoneNumber={environment.phoneNumber}
      />
    </nav>
  );
});
