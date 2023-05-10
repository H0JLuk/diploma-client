import { ComponentProps, FC, PropsWithChildren } from 'react';

import { LoaderSvg } from './ButtonLoader';

export type Variant = 'primary' | 'outlined' | 'clear';

const commonStyles = 'inline-flex items-center text-m font-medium disabled:cursor-not-allowed';
export const classNamesByVariant = {
  primary: ' bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-full ',
  outlined:
    'bg-white hover:bg-gray-100 border text-gray-500 border-gray-200 font-bold py-2 px-4 rounded-full hover:text-gray-900',
  clear: '',
} satisfies Record<Variant, string>;

export type ButtonProps = ComponentProps<'button'> &
  PropsWithChildren<{
    isLoading?: boolean;
    variant?: Variant;
  }>;

export const Button: FC<ButtonProps> = ({
  type = 'button',
  className = '',
  isLoading,
  disabled,
  variant = 'primary',
  children,
  ...rest
}) => (
  <button
    {...rest}
    className={`${commonStyles} ${classNamesByVariant[variant]} ${className}`}
    type={type === 'button' ? 'button' : 'submit'}
    disabled={disabled || isLoading}
  >
    {isLoading && <LoaderSvg />}
    {children}
  </button>
);
