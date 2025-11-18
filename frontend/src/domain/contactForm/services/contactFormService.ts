import { publicClient } from '@/core/lib/api';
import type { ContactFormSubmitData, ContactFormResponse } from '../types';

export const contactFormService = {
  async submit(data: ContactFormSubmitData): Promise<ContactFormResponse> {
    const response = await publicClient.post('/contact-form', data);
    return response.data.data;
  },
};
