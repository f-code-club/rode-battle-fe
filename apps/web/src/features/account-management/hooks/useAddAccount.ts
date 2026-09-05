import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addAccountSchema, type AddAccountForm } from '../schemas/account.schema';
import { accountService } from '../services/account.service';

export const useAddAccount = (onCreated: () => void) => {
  const form = useForm<AddAccountForm>({
    resolver: zodResolver(addAccountSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      role: 'participant',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await accountService.createAccounts([data]);
      toast.success(`Account created, login details sent to ${data.email}`);
      form.reset();
      onCreated();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong, please try again';
      form.setError('root', { message });
    }
  });

  const reset = () => form.reset();

  return { form, onSubmit, reset };
};
