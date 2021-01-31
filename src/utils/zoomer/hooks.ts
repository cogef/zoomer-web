import { useEffect, useState } from 'react';
import { getMeetings } from './requests';
import { Response } from '../../services/zoomer-api';

export const useMeetings = () => {
  return useResource(getMeetings);
};

const useResource = <T>(getter: () => Promise<Response<T>>) => {
  const [state, setState] = useState<ResourceState<T>>([null, true, null]);

  useEffect(() => {
    let isMounted = true;
    getter()
      .then(res => {
        if (res.err !== null) {
          isMounted && setState([null, false, res.err]);
        } else {
          isMounted && setState([res.data, false, null]);
        }
      })
      .catch(err => {});
    return () => {
      isMounted = false;
    };
  }, [getter]);

  return state;
};

type ResourceState<T> =
  | [Data: T, IsLoading: false, Error: null]
  | [Data: null, IsLoading: false, Error: string]
  | [Data: null, IsLoading: true, Error: null];
