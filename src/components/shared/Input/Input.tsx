import { FC, forwardRef, InputHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';

const fixedInputClass =
  'rounded-md relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  customClass?: string;
  containerClassName?: string;
  labelText: string;
  error?: string;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(function Input(
  { labelText, customClass = '', containerClassName = '', error: errorText, ...inputProps },
  ref,
) {
  const fakeId = useId();

  const inputId = inputProps.id || fakeId;

  return (
    <div className={twMerge(`my-3 ${containerClassName}`)}>
      {labelText && (
        <label className='mb-0.5 mr-2 inline-block' htmlFor={inputId}>
          {labelText}
        </label>
      )}
      <input className={twMerge(fixedInputClass + customClass)} {...inputProps} id={inputId} ref={ref} />
      {!!errorText && <p className='text-[red]'>{errorText}</p>}
    </div>
  );
});
