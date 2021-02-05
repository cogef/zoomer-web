import { useEffect } from 'react';

export const useOnScroll = <T extends HTMLElement>(fn: (el: T) => void, el?: T) => {
  useEffect(() => {
    const elem = el || document;
    const cb = (e: Event) => fn(e.target as T);
    elem.addEventListener('scroll', cb);
    return () => elem.removeEventListener('scroll', cb);
  }, [fn, el]);
};
