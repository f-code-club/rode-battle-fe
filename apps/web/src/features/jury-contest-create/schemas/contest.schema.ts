import { z } from 'zod';

export const createContestSchema = z
  .object({
    name: z.string().trim().min(1, 'Contest name is required').max(100, 'Contest name cannot exceed 100 characters'),
    start: z.string().min(1, 'Start time is required'),
    end: z.string().min(1, 'End time is required'),
    problems: z.array(z.string().uuid('Invalid problem UUID')).default([]),
  })
  .refine(
    (data) => {
      if (!data.start || !data.end) return true;
      const startDate = new Date(data.start);
      const endDate = new Date(data.end);
      return endDate.getTime() > startDate.getTime();
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    },
  );

export type CreateContestFormData = z.infer<typeof createContestSchema>;
