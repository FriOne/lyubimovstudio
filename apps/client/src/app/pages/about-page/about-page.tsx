import React, { FunctionComponent } from 'react';

import './about-page.css';

import { bemClassName } from '../../utils/helpers';

const cls = bemClassName('about-page');

export const AboutPage: FunctionComponent = () => {
  return (
    <div className={cls()}>
      <div className={cls('description')}>
        <h2 className={cls('title', { about: true })}>
          О компании
        </h2>
        <div className={cls('text', { about: true })}>
          Архитектурное бюро LyubimovStudio основано в 2010г. российским архитектором Алексеем Любимовым.
          Бюро занимается проектированием жилых и общественных зданий,
          работает в сфере дизайна жилого и общественного интерьера.
        </div>

        <h2 className={cls('services', { services: true })}>
          Услуги
        </h2>
        <div className={cls('text', { services: true })}>
          <p>
            Архитектурное бюро LyubimovStudio предлагает полный спектр услуг в
            области архитектурного проектирования, дизайна интерьеров,
            управления проектом и реализации под ключ.
          </p>

          <p>
            Мы проектируем интерьеры квартир, вилл, офисов, ресторанов, гостиниц,
            магазинов, бутиков, банков.
          </p>

          <p>
            Мы проектируем дома, таунхаусы, виллы, гостиницы, жилые комплексы,
            поселки, офисные комплексы.
          </p>

          <p>
            В течение долгого времени, нами были отобраны самые надежные
            компании по поставкам мебели, сантехники, освещения,
            предлагающие нашим клиентам самые выгодные цены на свои услуги.
          </p>

          <p>
            Наши партнеры по инженерным разделам оказывают
            полный цикл услуг — от проектирования до монтажа.
          </p>
        </div>

        <h2 className={cls('title')}>
          Стадии работы
        </h2>

        <h3 className={cls('subtitle')}>
          Дизайн интерьера:
        </h3>
        <ul className={cls('list')}>
          <li className={cls('list-item')}>
            дизайн проект
          </li>
          <li className={cls('list-item')}>
            комплектация
          </li>
          <li className={cls('list-item')}>
            инженерия
          </li>
          <li className={cls('list-item')}>
            авторский надзор
          </li>
          <li className={cls('list-item')}>
            декорирование
          </li>
          <li className={cls('list-item')}>
            строительство
          </li>
        </ul>

        <h3 className={cls('subtitle')}>
          Архитектурное проектирование:
        </h3>
        <ul className={cls('list')}>
          <li className={cls('list-item')}>
            эскизный проект
          </li>
          <li className={cls('list-item')}>
            рабочий проект
          </li>
          <li className={cls('list-item')}>
            авторский надзор
          </li>
          <li className={cls('list-item')}>
            инженерия
          </li>
          <li className={cls('list-item')}>
            строительство
          </li>
        </ul>
      </div>

      <div className={cls('photos')}>
        <img
          className={cls('photo')}
          src="/assets/photo.jpg"
        />
      </div>
    </div>
  );
};
