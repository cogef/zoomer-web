export const dev = {} as any;

if (process.env.NODE_ENV === 'development') {
  (window as any).dev = dev;
}
