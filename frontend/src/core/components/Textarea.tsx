import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={twMerge(
          'flex min-h-[80px] w-full rounded-sm',
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

Textarea.displayName = 'Textarea';
