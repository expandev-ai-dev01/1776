import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseVehicleListOptions, UseVehicleListReturn } from './types';

export const useVehicleList = (options: UseVehicleListOptions): UseVehicleListReturn => {
  const queryKey = ['vehicles', options.params];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(options.params),
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicles: data?.vehicles || [],
    total: data?.total || 0,
    page: data?.page || 1,
    pageSize: data?.pageSize || 12,
    totalPages: data?.totalPages || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
