import { auth } from 'services/firebase';

export const zoomerRequest = async (options: RequestProps): Promise<Response> => {
  const jwt = (await auth.currentUser?.getIdToken(true)) || '';
  if (!jwt) {
    console.error('JWT not generated');
  }

  const res = await fetch(`https://api.cogef.org/zoomer${options.path || ''}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const status = res.status;
  const body = await res.json();
  if (status >= 400) {
    return [body.error, null];
  }
  return [null, body];
};

type RequestProps = {
  method?: string;
  /** Resource path, including any query params */
  path?: string;
  body?: Object;
};

type Response = [ErrorMsg: string, Data: null] | [ErrorMsg: null, Data: any];
