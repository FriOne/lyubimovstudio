import React, { ChangeEvent, DetailedHTMLProps, FunctionComponent, memo, useCallback, useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

import './request-modal.css';

import { sendRequest } from '../../api';

import { bemClassName, validatePhoneNumber } from '../../utils/helpers';
import { Modal, Props as ModalProps } from '../modal/modal';
import { Checkbox } from '../checkbox/checkbox';
import { Spinner } from '../spinner/spinner';

type Props = {
  onClose(result: boolean): void;
} & Omit<ModalProps, 'className' | 'onRequestClose'>;
type InputProps = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const cls = bemClassName('request-modal');

export const RequestModal: FunctionComponent<Props> = memo((props) => {
  const { isOpen, onClose, ...modalProps } = props;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [error, setError] = useState(false);

  const onRequestClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setError(null);
  }, []);
  const onPhoneNumberChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberIsValid(validatePhoneNumber(event.currentTarget.value));
    setPhoneNumber(event.currentTarget.value);
    setError(null);
  }, []);
  const onMessageChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
    setError(null);
  }, []);
  const onAcceptPrivacyChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAcceptPrivacy(event.currentTarget.checked);
    setError(null);
  }, []);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    setSending(true);
    setError(null);

    try {
      await sendRequest({ name, phoneNumber, message });

      // Reset form state before close.
      setName('');
      setPhoneNumber('');
      setMessage('');
      setAcceptPrivacy(false);
      onClose(true);
    }
    catch (error) {
      setError(error);
    }

    setSending(false);
  }, [onClose, name, phoneNumber, message]);

  return (
    <Modal
      className={cls()}
      isOpen={isOpen || sending}
      onRequestClose={onRequestClose}
      {...modalProps}
    >
      <form onSubmit={onSubmit} >
        <h2 className={cls('title')}>
          Заказать дизайн
        </h2>

        <fieldset className={cls('fieldset')} disabled={sending}>
          <div className={cls('form-group')}>
            <label className={cls('label')}>
              <div className={cls('label-text')}>
                Как к вам обращаться:
              </div>
              <input
                className={cls('input', { name: true })}
                name="name"
                value={name}
                onChange={onNameChange}
              />
            </label>
          </div>

          <div className={cls('form-group')}>
            <label className={cls('label')}>
              <div className={cls('label-text')}>
                Номер телефона:
              </div>
              <div className={cls('input-wrapper')}>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                >
                  {(inputProps: InputProps) => (
                    <input
                      className={cls('input', { phone: true })}
                      type="tel"
                      name="phoneNumber"
                      required
                      {...inputProps}
                    />
                  )}
                </InputMask>

                <span className={cls('required-mark')}>*</span>
              </div>
            </label>
          </div>

          <div className={cls('form-group')}>
            <label className={cls('label')}>
              <div className={cls('label-text')}>
                Сообщение:
              </div>
              <textarea
                className={cls('textarea', { message: true })}
                name="message"
                value={message}
                onChange={onMessageChange}
              />
            </label>
          </div>

          <Checkbox
            className={cls('privacy-checkbox')}
            checked={acceptPrivacy}
            onChange={onAcceptPrivacyChange}
          >
            <span className={cls('privacy-text')}>
              Нажимая "Отправить", вы соглашаетесь с <Link to="/privacy" target="_blank">политикой конфиденциальности</Link>
            </span>
          </Checkbox>

          {sending
            ? <Spinner className={cls('spinner')}/>
            : (
              <button
                className={cls('submit')}
                disabled={!acceptPrivacy || !phoneNumberIsValid}
              >
                Отправить
              </button>
            )
          }

          {error && (
            <div className={cls('error')}>
              Во время отправки возникла ошибка, попробуйте еще раз.
            </div>
          )}
        </fieldset>
      </form>
    </Modal>
  );
});
