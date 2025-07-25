'use client';

import { type FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  type ChangeLoginFormSchema,
  changeLoginAction,
  changeLoginFormSchema,
} from '@/entities/profile';
import { Form, Input, LoadingButton } from '@/shared/ui';

type ChangeLoginFormProps = {
  currentLogin: string;
};

export const ChangeLoginForm: FC<ChangeLoginFormProps> = ({ currentLogin }) => {
  const [loading, setLoading] = useState(false);

  const changeLoginForm = useForm<ChangeLoginFormSchema>({
    resolver: yupResolver(changeLoginFormSchema),
    defaultValues: {
      currentLogin,
      newLogin: '',
    },
  });

  const onChangeLoginSubmit = async (data: ChangeLoginFormSchema) => {
    setLoading(true);
    const resp = await changeLoginAction(data);

    if (resp.success) {
      toast.success('Логин успешно изменен!');
      changeLoginForm.setValue('currentLogin', data.newLogin);
      changeLoginForm.setValue('newLogin', '');
    } else if (resp.error) {
      toast.error(resp.error);
    }
    setLoading(false);
  };

  return (
    <Form
      className="h-full bg-gray-50 p-4 rounded shadow flex flex-col gap-4"
      form={changeLoginForm}
      onSubmit={changeLoginForm.handleSubmit(onChangeLoginSubmit)}
    >
      <h3 className="text-md font-semibold mb-2">Сменить логин</h3>
      <Input
        control={changeLoginForm.control}
        name="currentLogin"
        label="Текущий логин"
        className="bg-gray-200 rounded px-3 py-5 border border-gray-300 cursor-not-allowed"
        readOnly={true}
      />
      <Input
        control={changeLoginForm.control}
        name="newLogin"
        label="Новый логин"
        className="rounded px-3 py-5"
      />
      <LoadingButton loading={loading} className="mt-auto">
        Сменить логин
      </LoadingButton>
    </Form>
  );
};
