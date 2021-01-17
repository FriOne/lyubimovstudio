import React, { useCallback, useMemo, useState } from 'react';
import { Switch } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import { ToastContainer, toast } from 'react-toastify';

import './app.css';

import { environment } from '../environments/environment';
import { bemClassName } from './utils/helpers';
import { Link, Navigation } from './components/navigation/navigation';
import { routes } from './routes';
import { HelmetRoute } from './components/helmet-route/helmet-route';
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

  const links: Link[] = useMemo(() => {
    return routes
      .filter(route => route.navTitle)
      .map(route => ({
        to: route.path,
        children: route.navTitle,
      }));
  }, []);

  return (
    <div className={cls()}>
      <Navigation
        className={cls('navigation')}
        links={links}
      />

      <div className={cls('content')}>
        <Switch>
          {routes.map(route => <HelmetRoute key={route.path} {...route}/>)}
        </Switch>
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

export default App;
