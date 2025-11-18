import type { ContactFormSubmitData, ContactFormResponse } from '../../types';

export interface UseContactFormSubmitOptions {
  onSuccess?: (data: ContactFormResponse) => void;
  onError?: (error: Error) => void;
}

export interface UseContactFormSubmitReturn {
  submit: (data: ContactFormSubmitData) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}
