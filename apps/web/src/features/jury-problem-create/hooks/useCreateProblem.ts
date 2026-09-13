import { problemService } from '@/features/jury-dashboard/services';
import type { CreateProblemRequest, ProblemType } from '@/features/jury-dashboard/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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

function toPayload(data: ProblemFormData): CreateProblemRequest {
  if (data.type === 'CSS_BATTLE') {
    return {
      name: data.name.trim(),
      content: data.base64Content!,
      languages: ['html'],
      color_code: data.colorCode || null,
    };
  }
  return {
    name: data.name.trim(),
    content: data.statement!.trim(),
    languages: data.languages.filter((l) => l !== 'html'),
    time_limit: data.timeLimit!,
    memory_limit: data.memoryLimit!,
    checker_language: data.checkerLanguage!,
    checker_code: data.checkerCode!.trim(),
    color_code: data.colorCode || null,
  };
}

export function useCreateProblem() {
  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const problemType = useWatch({ control: form.control, name: 'type' });

  const createProblem = useMutation({
    mutationFn: (data: ProblemFormData) => problemService.create(toPayload(data)),
    onError: (err: Error) => toast.error(err.message),
  });

  const createdProblem: { id: string; name: string; type: ProblemType } | null =
    createProblem.isSuccess && createProblem.variables
      ? { id: createProblem.data, name: createProblem.variables.name.trim(), type: createProblem.variables.type }
      : null;

  const handleTypeChange = (type: ProblemType) => {
    if (type === problemType) return;
    form.setValue('type', type, { shouldDirty: true });
    form.setValue('colorCode', DEFAULT_COLOR[type]);
    form.setValue('languages', type === 'CSS_BATTLE' ? ['html'] : DEFAULT_VALUES.languages);
    form.clearErrors();
  };

  const resetForm = () => {
    form.reset(DEFAULT_VALUES);
    createProblem.reset();
  };

  return {
    form,
    problemType,
    isSubmitting: createProblem.isPending,
    createdProblem,
    handleTypeChange,
    submitProblem: createProblem.mutate,
    resetForm,
  };
}
