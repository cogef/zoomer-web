import { useCallback, useEffect, useState } from 'react';
import { getMeetings, MeetingsOptions } from './requests';
import { Response } from '../../services/zoomer-api';

export const useMeetings = (opts: MeetingsOptions) => {
  const getter = useCallback(
    () => getMeetings(opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [opts.limit, opts.start, opts.end, opts.lastMeetingID, opts.lastOccurrenceID, opts.hostEmail]
  );
  return useResource(getter);
};

const useResource = <T>(getter: () => Promise<Response<T>>) => {
  const [state, setState] = useState<ResourceState<T>>([null, true, null]);
  const [toggle, setToggle] = useState<boolean>(true);

  const reload = () => setToggle(t => !t);

  useEffect(() => {
    let isMounted = true;
    setState(s => [s[0], true, null]);
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
  }, [getter, toggle]);

  return [...state, reload] as const;
};

type ResourceState<T> =
  | [Data: T, IsLoading: false, Error: null]
  | [Data: null, IsLoading: false, Error: string]
  | [Data: T | null, IsLoading: true, Error: null];
