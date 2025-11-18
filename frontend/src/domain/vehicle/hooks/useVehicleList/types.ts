import type { VehicleListParams, Vehicle } from '../../types';

export interface UseVehicleListOptions {
  params: VehicleListParams;
}

export interface UseVehicleListReturn {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
