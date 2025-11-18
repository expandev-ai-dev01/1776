import type { FilterOptions } from '../../types';

export interface UseFilterOptionsReturn {
  filterOptions: FilterOptions;
  isLoading: boolean;
  error: Error | null;
}
