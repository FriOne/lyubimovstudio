import { useContext } from 'react';
import useSSR from 'use-ssr';

import { InitialDataContext } from '../initial-data-context';

export function useInitialState<T>(defaultValue: T): T {
  const { isBrowser, isServer } = useSSR();
  const initialData = useContext(InitialDataContext);
  let initialState = defaultValue;

  if (isBrowser && window.__initialData__) {
    initialState = window.__initialData__;

    delete window.__initialData__;
  } else if (isServer && initialData) {
    initialState = initialData;
  }

  return initialState;
}
