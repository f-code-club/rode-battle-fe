import { juryContestKeys } from '@/features/jury-dashboard/queryKeys';
import { contestService } from '@/features/jury-dashboard/services';
import type { CreateContestRequest } from '@/features/jury-dashboard/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createContestSchema, type CreateContestFormData } from '../schemas/contest.schema';

export function useCreateContest() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<CreateContestFormData>({
    resolver: zodResolver(createContestSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      start: '',
      end: '',
      problems: [],
    },
  });

  const createContest = useMutation({
    mutationFn: (input: CreateContestRequest) => contestService.create(input),
    onSuccess: (_, input) => {
      void queryClient.invalidateQueries({ queryKey: juryContestKeys.all });
      toast.success(`Contest "${input.name}" created successfully!`);
      void navigate({ to: '/jury' });
    },
    onError: (err: Error) => {
      form.setError('root', { message: err.message });
      toast.error(err.message);
    },
  });

  const onSubmit = form.handleSubmit((data) =>
    createContest
      .mutateAsync({
        name: data.name,
        start: new Date(data.start).toISOString(),
        end: new Date(data.end).toISOString(),
        problems: data.problems,
      })
      .catch(() => undefined),
  );

  return { form, onSubmit };
}
