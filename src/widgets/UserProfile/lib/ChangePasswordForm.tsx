'use client';

import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  type ChangePasswordFormSchema,
  changePasswordFormSchema,
} from '@/entities/profile';
import { changePasswordAction } from '@/entities/profile/api/changePasswordAction';
import { Form, Input, LoadingButton } from '@/shared/ui';

export const ChangePasswordForm: FC = () => {
  const [loading, setLoading] = useState(false);

  const changePasswordForm = useForm<ChangePasswordFormSchema>({
    resolver: yupResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormSchema) => {
    setLoading(true);
    const resp = await changePasswordAction(data);

    if (resp.success) {
      toast('Пароль успешно изменен!');
      changePasswordForm.reset();
    } else if (resp.error) {
      toast(resp.error);
    }
    setLoading(false);
  };

  return (
    <Form
      form={changePasswordForm}
      onSubmit={changePasswordForm.handleSubmit(onSubmit)}
      className="bg-gray-50 p-4 rounded shadow flex flex-col gap-4"
    >
      <h3 className="text-md font-semibold mb-2">Сменить пароль</h3>
      <Input
        control={changePasswordForm.control}
        name="currentPassword"
        label="Текущий пароль"
        className="rounded px-3 py-5"
      />
      <Input
        control={changePasswordForm.control}
        name="newPassword"
        label="Новый пароль"
        className="rounded px-3 py-5"
      />
      <Input
        control={changePasswordForm.control}
        name="repeatNewPassword"
        label="Повторить новый пароль"
        className="rounded px-3 py-5"
      />
      <LoadingButton
        loading={loading}
        className="mt-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
      >
        Сменить пароль
      </LoadingButton>
    </Form>
  );
};
