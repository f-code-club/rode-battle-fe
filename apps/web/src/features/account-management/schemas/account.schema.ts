import { z } from 'zod';
import { ROLES } from '../types';

export const addAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  role: z.enum(ROLES),
});

export type AddAccountForm = z.infer<typeof addAccountSchema>;
