export interface Account {
  id: string;
  email: string;
  name: string;
  password?: string;
  is_banned: boolean;
}

export type AccountStatusFilter = 'all' | 'active' | 'banned';

export const DEFAULT_PAGE_SIZE = 5;
