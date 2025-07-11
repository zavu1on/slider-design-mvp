'use client';

import { type FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
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
  const [inputsVisible, setInputsVisible] = useState({
    currentPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const changePasswordForm = useForm<ChangePasswordFormSchema>({
    resolver: yupResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });
  const PASSWORD_INPUTS: {
    name: keyof ChangePasswordFormSchema;
    label: string;
  }[] = [
    {
      name: 'currentPassword',
      label: 'Текущий пароль',
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
    },
    {
      name: 'repeatNewPassword',
      label: 'Повторите новый пароль',
    },
  ];

  const onChangePassword = async (data: ChangePasswordFormSchema) => {
    setLoading(true);
    const resp = await changePasswordAction(data);

    if (resp.success) {
      toast.success('Пароль успешно изменен!');
      changePasswordForm.reset();
    } else if (resp.error) {
      toast.error(resp.error);
    }
    setLoading(false);
  };

  return (
    <Form
      form={changePasswordForm}
      onSubmit={changePasswordForm.handleSubmit(onChangePassword)}
      className="bg-gray-50 p-4 rounded shadow flex flex-col gap-4"
    >
      <h3 className="text-md font-semibold mb-2">Сменить пароль</h3>
      {PASSWORD_INPUTS.map((input) => (
        <div
          key={input.name}
          className="w-full flex flex-row items-start justify-between"
        >
          <Input
            control={changePasswordForm.control}
            containerClassName="w-full mr-4 rounded"
            className="px-3 py-5"
            name={input.name}
            label={input.label}
            type={inputsVisible[input.name] ? 'text' : 'password'}
          />
          <Image
            src={inputsVisible[input.name] ? '/eye-slash.svg' : '/eye.svg'}
            alt="eye"
            width={28}
            height={28}
            className="cursor-pointer mt-7"
            onClick={() =>
              setInputsVisible((prev) => ({
                ...prev,
                [input.name]: !prev[input.name],
              }))
            }
          />
        </div>
      ))}
      <LoadingButton loading={loading} className="mt-auto">
        Сменить пароль
      </LoadingButton>
    </Form>
  );
};
