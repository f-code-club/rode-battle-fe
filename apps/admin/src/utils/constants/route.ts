export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  BATTLES: '/battles',
  BATTLES_CREATE: '/battles/create',
  BATTLES_DETAIL: (id: string) => `/battles/${id}`,
  BATTLES_EDIT: (id: string) => `/battles/${id}/edit`,
  USERS: '/users',
  SUBMISSIONS: '/submissions',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;
