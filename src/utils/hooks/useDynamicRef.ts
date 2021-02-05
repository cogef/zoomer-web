import { useEffect, useRef } from 'react';

export const useDynamicRef = <T>(val: T) => {
  const ref = useRef(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
};
