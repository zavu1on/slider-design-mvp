'use client';

import { type FC, useState } from 'react';
import Image from 'next/image';
import { Card, Form, Input, LoadingButton } from '@/shared/ui';
import { useLoginForm } from './lib';

export const LoginForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { loginForm, onSubmit, loading } = useLoginForm();

  return (
    <>
      <Card
        title="Авторизация"
        description="Введите логин и пароль"
        className="w-96"
      >
        <Form form={loginForm} onSubmit={loginForm.handleSubmit(onSubmit)}>
          <Input control={loginForm.control} name="email" label="Логин" />
          <div className="flex flex-row items-start justify-between">
            <Input
              control={loginForm.control}
              containerClassName="w-full mr-4"
              name="password"
              label="Пароль"
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <Image
              src={isPasswordVisible ? '/eye-slash.svg' : '/eye.svg'}
              alt="eye"
              width={28}
              height={28}
              className="cursor-pointer mt-7"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            />
          </div>
          <LoadingButton loading={loading} className="mt-4">
            Войти
          </LoadingButton>
        </Form>
      </Card>
    </>
  );
};
