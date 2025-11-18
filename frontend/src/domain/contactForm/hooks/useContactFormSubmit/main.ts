import { useMutation } from '@tanstack/react-query';
import { contactFormService } from '../../services';
import type { UseContactFormSubmitOptions, UseContactFormSubmitReturn } from './types';
import type { ContactFormSubmitData } from '../../types';

export const useContactFormSubmit = (
  options: UseContactFormSubmitOptions
): UseContactFormSubmitReturn => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: ContactFormSubmitData) => contactFormService.submit(data),
    onSuccess: (data) => {
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  return {
    submit: mutateAsync,
    isSubmitting: isPending,
    error: error as Error | null,
  };
};
