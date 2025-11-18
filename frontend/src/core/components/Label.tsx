import { forwardRef, type LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={twMerge(
        'text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});

Label.displayName = 'Label';
