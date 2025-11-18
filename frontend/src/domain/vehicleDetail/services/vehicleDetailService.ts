import { authenticatedClient } from '@/core/lib/api';
import type { VehicleDetailResponse } from '../types';

export const vehicleDetailService = {
  async getById(id: string): Promise<VehicleDetailResponse> {
    const response = await authenticatedClient.get(`/vehicle-detail/${id}`);
    return response.data.data;
  },
};
