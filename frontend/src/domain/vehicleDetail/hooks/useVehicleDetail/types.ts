import type { VehicleDetailResponse } from '../../types';

export interface UseVehicleDetailOptions {
  id: string;
}

export interface UseVehicleDetailReturn {
  data: VehicleDetailResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
