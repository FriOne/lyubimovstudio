import React, { FunctionComponent, memo, useMemo } from 'react';

import './phone-number.css';

import { bemClassName } from '../../../utils/helpers';
import { ReactComponent as PhoneSvg } from './phone.svg';

type Props = {
  className?: string;
  phoneNumber: string;
};

const cls = bemClassName('phone-number');

export const PhoneNumber: FunctionComponent<Props> = memo((props) => {
  const { className= '', phoneNumber } = props;

  const plainPhoneNumber = useMemo(() => {
    return phoneNumber
      .replace(' ', '')
      .replace('(', '')
      .replace(')', '');
  }, [phoneNumber]);

  return (
    <a className={cls(null, [className])} href={`tel:${plainPhoneNumber}`}>
      <PhoneSvg className={cls('image')}/>
      <span className={cls('number')}>
        {phoneNumber}
      </span>
    </a>
  );
});
