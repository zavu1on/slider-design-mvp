import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type LoginFormSchema, loginFormSchema } from '@/entities/auth';

interface UseLoginForm {
  loginForm: ReturnType<typeof useForm<LoginFormSchema>>;
  onSubmit: (values: LoginFormSchema) => void;
  loading: boolean;
}

export const useLoginForm = (): UseLoginForm => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: LoginFormSchema) => {
    setLoading(true);
    const resp = await signIn('credentials', {
      redirect: false,
      ...values,
    });

    if (resp?.error) {
      toast.error('Неправильный логин или пароль');
    } else {
      toast.success('Вы успешно вошли в систему');

      router.push(params?.get('callbackUrl') ?? '/slides');
    }

    setLoading(false);
  };

  return {
    loginForm,
    onSubmit,
    loading,
  };
};
