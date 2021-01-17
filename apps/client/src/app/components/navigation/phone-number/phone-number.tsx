import React, { FunctionComponent, useMemo } from 'react';

import { bemClassName } from '../../../utils/helpers';
import { ReactComponent as PhoneSvg } from './phone.svg';

type Props = {
  className?: string;
  phoneNumber: string;
};

const cls = bemClassName('phone-number');

export const PhoneNumber: FunctionComponent<Props> = (props) => {
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
};
