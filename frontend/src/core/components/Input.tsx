import { forwardRef, type InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          'flex h-10 w-full rounded-sm',
          'border border-[--color-input]',
          'bg-[--color-background]',
          'px-3 py-2',
          'text-sm',
          'ring-offset-[--color-background]',
          'placeholder:text-[--color-muted-foreground]',
          'focus-visible:outline-hidden',
          'focus-visible:ring-3',
          'focus-visible:ring-[--color-ring]',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
