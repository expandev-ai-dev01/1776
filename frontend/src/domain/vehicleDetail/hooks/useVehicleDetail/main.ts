import { useQuery } from '@tanstack/react-query';
import { vehicleDetailService } from '../../services';
import type { UseVehicleDetailOptions, UseVehicleDetailReturn } from './types';

export const useVehicleDetail = (options: UseVehicleDetailOptions): UseVehicleDetailReturn => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['vehicle-detail', options.id],
    queryFn: () => vehicleDetailService.getById(options.id),
    enabled: !!options.id,
    retry: 3,
    retryDelay: 2000,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
