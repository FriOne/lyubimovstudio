import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import { ToastContainer, toast } from 'react-toastify';

import './app.css';

import { environment } from '../environments/environment';
import { navLinks, routes } from './routes';
import { bemClassName } from './utils/helpers';
import { Navigation } from './components/navigation/navigation';
import { RequestModal } from './components/request-modal/request-modal';

const cls = bemClassName('app');

export function App() {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const onModalOpenClick = useCallback(() => setModalIsOpened(true), []);
  const onModalClose = useCallback((result: boolean) => {
    setModalIsOpened(false);

    if (result) {
      toast('Ваша заявка отправлена!');
    }
  }, []);

  return (
    <div className={cls()}>
      <Navigation
        className={cls('navigation')}
        links={navLinks}
      />

      <div className={cls('content')}>
        <Routes>
          {routes.map((route) => <Route key={route.path ?? '404'} {...route}/>)}
        </Routes>
      </div>

      <button
        className={cls('request-button')}
        onClick={onModalOpenClick}
      >
        Заказать дизайн
      </button>

      <RequestModal
        isOpen={modalIsOpened}
        onClose={onModalClose}
      />

      <ToastContainer/>

      {Boolean(environment.yandexMetrikaId) && (
        <YMInitializer
          version="2"
          accounts={[environment.yandexMetrikaId]}
          options={{ webvisor: true }}
        />
      )}
    </div>
  );
}
