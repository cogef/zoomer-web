import { auth } from 'services/firebase';

export const zoomerRequest = async (options: RequestProps) => {
  const jwt = (await auth.currentUser?.getIdToken(true)) || '';
  if (!jwt) {
    console.error('JWT not generated');
  }

  const res = await fetch(`https://api.cogef.org/zoomer/${options.path || ''}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
    .then(async res => [null, (await res.json()) as Object] as const)
    .catch((err: Error) => {
      console.error(err);
      return [err, null] as const;
    });
  return res;
};

type RequestProps = {
  method?: string;
  /** Resource path, including any query params */
  path?: string;
  body?: Object;
};
