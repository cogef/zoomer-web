export const routes = {
  HOME: '/',
  LOGIN: '/login',
  NOT_FOUND: '/404',
  HOST_JOIN: '/host-join',
  SCHEDULE: '/schedule',
  MANAGE: '/manage',
  MEETINGS: '/meetings',
} as const;

type PageRoute = keyof typeof routes;
export type RoutePath = typeof routes[PageRoute];
