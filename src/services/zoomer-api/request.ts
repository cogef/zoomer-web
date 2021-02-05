import { auth } from 'services/firebase';

export const zoomerRequest = async <T>(options: RequestProps): Promise<Response<T>> => {
  const jwt = (await auth.currentUser?.getIdToken(true)) || '';
  if (!jwt) {
    console.log('JWT not generated');
  }

  const res = await fetch(`https://api.cogef.org/zoomer${options.path || ''}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const status = res.status;
  const body = status === 204 ? null : await res.json();

  if (status >= 400) {
    console.error({ ZOOMER_ERROR: body });
    return { err: body.errorMessage || res.statusText, status, data: null };
  }
  return { err: null, status, data: body };
};

type RequestProps = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Resource path, including any query params */
  path?: string;
  body?: Object;
};

export type Response<T> = { err: string; status: number; data: null } | { err: null; status: number; data: T };
