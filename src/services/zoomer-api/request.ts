import { captureException } from '@sentry/minimal';
import env from 'env';
import { auth } from 'services/firebase';
import { v4 as uuidv4 } from 'uuid';

export const zoomerRequest = async <T>(opts: RequestProps): Promise<Response<T>> => {
  const jwt = (await auth.currentUser?.getIdToken(true)) || '';
  if (!jwt) {
    console.log('JWT not generated');
  }

  const apiHost = env.API_HOST;

  const endpoint = opts.path || '';
  const query = opts.qParams ? `?${new URLSearchParams(opts.qParams as any).toString()}` : '';

  const res = await fetch(`${apiHost}${endpoint}${query}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
      'x-request-id': uuidv4(),
    },
    method: opts.method,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const status = res.status;
  const body = status === 204 ? null : await res.json();

  if (status >= 400) {
    console.error({ ZOOMER_ERROR: body });
    const errMsg = body.errorMessage || body.error || res.statusText;
    captureException(new Error(errMsg));
    return { err: errMsg, status, data: null };
  }
  return { err: null, status, data: body };
};

type RequestProps = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path?: string;
  body?: Object;
  qParams?: Record<string, any>;
};

export type Response<T> = { err: string; status: number; data: null } | { err: null; status: number; data: T };
