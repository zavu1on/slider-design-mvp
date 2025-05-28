import { ButtonHTMLAttributes, type FC, type Ref } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from './Button';

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export const LoadingButton: FC<LoadingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </Button>
  );
};
