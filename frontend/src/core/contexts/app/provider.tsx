import type { ReactNode } from 'react';
import type { AppProviderProps } from './types';

export const AppProvider = ({ children }: AppProviderProps) => {
  return <>{children}</>;
};
