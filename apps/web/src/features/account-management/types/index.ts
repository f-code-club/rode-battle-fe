export const ROLES = ['participant', 'jury', 'admin'] as const;

export type Role = (typeof ROLES)[number];

export interface Account {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: Role;
  is_banned: boolean;
}

export type AccountStatusFilter = 'all' | 'active' | 'banned';

export const DEFAULT_PAGE_SIZE = 5;
