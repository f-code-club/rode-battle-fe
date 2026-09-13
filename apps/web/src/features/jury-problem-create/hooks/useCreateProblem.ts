import { problemService } from '@/features/jury-dashboard/services';
import type { CreateProblemRequest, ProblemType } from '@/features/jury-dashboard/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { DEFAULT_COLOR } from '../constants';
import { problemSchema, type ProblemFormData } from '../schemas/problem.schema';

const DEFAULT_VALUES: ProblemFormData = {
  type: 'ALGORITHM',
  name: '',
  colorCode: DEFAULT_COLOR.ALGORITHM,
  base64Content: '',
  statement: '',
  languages: ['cpp', 'python', 'java', 'rust'],
  timeLimit: 1000,
  memoryLimit: 256,
  checkerLanguage: 'cpp',
  checkerCode: '',
};

export function useCreateProblem() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProblem, setCreatedProblem] = useState<{ id: string; name: string; type: ProblemType } | null>(null);

  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const problemType = useWatch({ control: form.control, name: 'type' });

  const handleTypeChange = (type: ProblemType) => {
    if (type === problemType) return;
    form.setValue('type', type, { shouldDirty: true });
    form.setValue('colorCode', DEFAULT_COLOR[type]);
    form.setValue('languages', type === 'CSS_BATTLE' ? ['html'] : DEFAULT_VALUES.languages);
    form.clearErrors();
  };

  const submitProblem = async (data: ProblemFormData): Promise<string | null> => {
    setIsSubmitting(true);
    try {
      const payload: CreateProblemRequest =
        data.type === 'CSS_BATTLE'
          ? {
              name: data.name.trim(),
              content: data.base64Content!,
              languages: ['html'],
              color_code: data.colorCode || null,
            }
          : {
              name: data.name.trim(),
              content: data.statement!.trim(),
              languages: data.languages.filter((l) => l !== 'html'),
              time_limit: data.timeLimit!,
              memory_limit: data.memoryLimit!,
              checker_language: data.checkerLanguage!,
              checker_code: data.checkerCode!.trim(),
              color_code: data.colorCode || null,
            };

      const problemId = await problemService.create(payload);

      setCreatedProblem({ id: problemId, name: payload.name, type: data.type });
      return problemId;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create problem');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset(DEFAULT_VALUES);
    setCreatedProblem(null);
  };

  return { form, problemType, isSubmitting, createdProblem, handleTypeChange, submitProblem, resetForm };
}
