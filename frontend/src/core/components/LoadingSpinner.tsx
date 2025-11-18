import type { HTMLAttributes } from 'react';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ size = 'md', className, ...props }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-8',
    lg: 'size-12',
  };

  return (
    <div className={`center ${className || ''}`} {...props}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-[--color-border] border-t-[--color-primary-600]`}
        role="status"
        aria-label="Carregando"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};
