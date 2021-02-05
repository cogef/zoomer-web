import { useCallback, useState } from 'react';
import { useOnScroll } from '.';

export const useScrollBottom = (el?: HTMLElement) => {
  const [state, setState] = useState(Infinity);

  const cb = useCallback(() => setState(getDistToBottom(el)), [el]);

  useOnScroll(cb, el);

  return state;
};

const getDistToBottom = (el?: HTMLElement) => {
  el = el || document.documentElement;
  return el.offsetHeight - (el.scrollTop + el.clientHeight);
};
