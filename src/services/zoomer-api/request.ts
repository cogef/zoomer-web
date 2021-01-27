import { auth } from 'services/firebase';

export const zoomerRequest = async (options: RequestProps): Promise<Response> => {
  const jwt = (await auth.currentUser?.getIdToken(true)) || '';
  if (!jwt) {
    console.error('JWT not generated');
    throw new Error('JWT not generated');
  }

  const res = await fetch(`https://api.cogef.org/zoomer${options.path || ''}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  console.log({ res });
  const status = res.status;
  const body = status === 204 ? null : await res.json();
  if (status >= 400) {
    return { err: body.error || res.statusText, status, data: null };
  }
  return { err: null, status, data: body };
};

type RequestProps = {
  method?: string;
  /** Resource path, including any query params */
  path?: string;
  body?: Object;
};

type Response = { err: string; status: number; data: null } | { err: null; status: number; data: any };
