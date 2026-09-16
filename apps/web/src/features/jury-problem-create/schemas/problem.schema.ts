import { z } from 'zod';

const optionalInt = (min: number, max: number, unit: string) =>
  z
    .number()
    .int(`Must be a whole number of ${unit}`)
    .min(min, `Minimum is ${min} ${unit}`)
    .max(max, `Maximum is ${max} ${unit}`)
    .optional();

export const problemSchema = z
  .object({
    type: z.enum(['CSS_BATTLE', 'ALGORITHM']),
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120, 'Name is too long'),
    colorCode: z.string().optional(),

    base64Content: z.string().optional(),

    statement: z.string().optional(),
    languages: z.array(z.enum(['cpp', 'python', 'java', 'rust', 'html'])),
    timeLimit: optionalInt(100, 15000, 'ms'),
    memoryLimit: optionalInt(16, 2048, 'MB'),
    checkerLanguage: z.enum(['cpp', 'python', 'java', 'rust']).optional(),
    checkerCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });

    if (data.type === 'CSS_BATTLE') {
      if (!data.base64Content) issue('base64Content', 'Upload the target image');
      return;
    }

    if (!data.statement || data.statement.trim().length < 10) issue('statement', 'Write the problem statement');
    if (data.languages.filter((l) => l !== 'html').length === 0) issue('languages', 'Select at least one language');
    if (data.timeLimit == null) issue('timeLimit', 'Time limit is required');
    if (data.memoryLimit == null) issue('memoryLimit', 'Memory limit is required');
    if (!data.checkerLanguage) issue('checkerLanguage', 'Checker language is required');
    if (!data.checkerCode || data.checkerCode.trim().length < 10) issue('checkerCode', 'Checker code is required');
  });

export type ProblemFormData = z.infer<typeof problemSchema>;
