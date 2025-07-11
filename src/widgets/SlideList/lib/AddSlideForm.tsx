'use client';

import { type FC, useRef, useTransition } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  type AddSlideFormSchema,
  addSlideAction,
  addSlideFormSchema,
} from '@/entities/slides';
import { Card, Form, Input, LoadingButton } from '@/shared/ui';

export const AddSlideForm: FC = () => {
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const addSlideForm = useForm<AddSlideFormSchema>({
    resolver: yupResolver(addSlideFormSchema),
    defaultValues: { name: '' },
  });

  const addSlide = (value: AddSlideFormSchema) => {
    startTransition(async () => {
      const resp = await addSlideAction({
        name: value.name.trim(),
      });

      if (!resp.success) {
        toast.error(resp.error);
        return;
      }

      addSlideForm.reset();
    });
  };

  return (
    <Card
      title=""
      className="overflow-hidden shadow-lg pt-0"
      footer={
        <LoadingButton
          loading={isPending}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
        >
          Начать новый проект
        </LoadingButton>
      }
    >
      <Form
        form={addSlideForm}
        onSubmit={addSlideForm.handleSubmit(addSlide)}
        ref={formRef}
      >
        <Input
          control={addSlideForm.control}
          name="name"
          placeholder="Название проекта"
          className="font-bold text-lg"
        />
      </Form>
      <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</p>
    </Card>
  );
};
