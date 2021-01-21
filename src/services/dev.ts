import { zoomerRequest } from './zoomer-api';

/** An object to use for exposing things to the `window` for debugging */
export const dev = {} as any;

if (process.env.NODE_ENV === 'development') {
  (window as any).dev = dev;
}

dev.api = {};

dev.api.sendPost = () => {
  return zoomerRequest({
    path: '/meetings',
    method: 'post',
    body: {
      a: 1,
      b: 2,
      c: 3,
    },
  });
};

dev.api.sendGet = () => {
  return zoomerRequest({
    path: '/meetings/123',
  });
};
