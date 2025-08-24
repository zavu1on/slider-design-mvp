import { yupResolver } from '@hookform/resolvers/yup';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import yup from 'yup';
import { Input } from '../Input';
import { Form } from './Form';

const testFormSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
});

type TestFormSchema = yup.InferType<typeof testFormSchema>;

describe('Form + Input', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    cleanup();
  });

  const TestForm = () => {
    const form = useForm<TestFormSchema>({
      defaultValues: { firstName: '', lastName: '' },
      resolver: yupResolver(testFormSchema),
    });

    return (
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Input control={form.control} name="firstName" label="First Name" />
        <Input control={form.control} name="lastName" label="Last Name" />
        <button type="submit">Submit</button>
      </Form>
    );
  };

  const TestFormWithError = () => {
    const form = useForm<TestFormSchema>({
      defaultValues: { firstName: '', lastName: '' },
      resolver: yupResolver(testFormSchema),
    });

    return (
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <Input control={form.control} name="firstName" label="First Name" />
        <Input control={form.control} label="Last Name" />
        <button type="submit">Submit</button>
      </Form>
    );
  };

  it('updates form values and calls onSubmit on submit', async () => {
    render(<TestForm />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce();
      expect(onSubmit).toHaveBeenCalledWith(
        { firstName: 'John', lastName: 'Doe' },
        expect.anything()
      );
    });
  });

  it('throws error if Input name is missing', () => {
    expect(() => render(<TestFormWithError />)).toThrowError();
  });

  it('updates form values on user input, calls onSubmit on Enter submit', async () => {
    render(<TestForm />);
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(lastNameInput, 'Doe');

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();

    await userEvent.keyboard('{enter}');

    expect(onSubmit).toHaveBeenCalledWith(
      { firstName: 'John', lastName: 'Doe' },
      expect.anything()
    );
  });

  it('show error message if form is invalid', async () => {
    const { container } = render(<TestForm />);
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(firstNameInput, 'J');
    await userEvent.type(lastNameInput, 'D');
    await userEvent.click(submitButton);

    expect(
      screen.queryByText('firstName must be at least 3 characters')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('lastName must be at least 3 characters')
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await userEvent.clear(firstNameInput);
    await userEvent.clear(lastNameInput);

    await userEvent.type(firstNameInput, 'Joe');
    await userEvent.type(lastNameInput, 'D');
    await userEvent.click(submitButton);

    expect(
      screen.queryByText('firstName must be at least 3 characters')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('lastName must be at least 3 characters')
    ).toBeInTheDocument();
  });

  it("doesn't call onSubmit if form is invalid", async () => {});
});
