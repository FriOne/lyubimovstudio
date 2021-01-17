import React, { FunctionComponent } from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';

import './modal.css';

import { bemClassName } from '../../utils/helpers';

type ClassNameProps =
  | 'className'
  | 'bodyOpenClassName'
  | 'htmlOpenClassName'
  | 'overlayClassName'
  | 'portalClassName';
export type Props = {
  className?: string;
} & Omit<ModalProps, ClassNameProps>;

if (typeof window !== 'undefined') {
  // We setup styles from css.
  ReactModal.defaultStyles = { overlay: {}, content: {} };
  ReactModal.setAppElement('#root');
}

const cls = bemClassName('modal');

export const Modal: FunctionComponent<Props> = (props) => {
  const { className = '', ...restProps } = props;

  return (
    <ReactModal
      className={cls(null, [className])}
      overlayClassName={cls('overlay')}
      portalClassName={cls('portal')}
      bodyOpenClassName="modal-opened"
      {...restProps}
    />
  );
};
