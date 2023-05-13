import { FC, forwardRef, InputHTMLAttributes } from 'react';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  customClass?: string;
  labelText: string;
  error?: string;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, customClass = '', error: errorText, ...inputProps }, ref) => (
    <div className='my-5'>
      <label htmlFor={inputProps.name}>{labelText}</label>
      <input className={fixedInputClass + customClass} {...inputProps} ref={ref} />
      {!!errorText && <p className='text-[red]'>{errorText}</p>}
    </div>
  ),
);
