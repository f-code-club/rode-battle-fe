import { contestService } from '@/features/jury-dashboard/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createContestSchema, type CreateContestFormData } from '../schemas/contest.schema';

export function useCreateContest() {
  const navigate = useNavigate();

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

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const isoStart = new Date(data.start).toISOString();
      const isoEnd = new Date(data.end).toISOString();

      await contestService.create({
        name: data.name,
        start: isoStart,
        end: isoEnd,
        problems: data.problems,
      });

      toast.success(`Contest "${data.name}" created successfully!`);
      navigate({ to: '/jury' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create contest. Please try again.';
      form.setError('root', { message });
      toast.error(message);
    }
  });

  return {
    form,
    onSubmit,
  };
}
