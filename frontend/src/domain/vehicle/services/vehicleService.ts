import { authenticatedClient } from '@/core/lib/api';
import type { VehicleListParams, VehicleListResponse, FilterOptions } from '../types';

export const vehicleService = {
  async list(params: VehicleListParams): Promise<VehicleListResponse> {
    const queryParams = new URLSearchParams();

    queryParams.append('page', params.page.toString());
    queryParams.append('pageSize', params.pageSize.toString());

    if (params.sortOrder) {
      queryParams.append('sortOrder', params.sortOrder);
    }

    if (params.filters?.marcas?.length) {
      queryParams.append('marcas', params.filters.marcas.join(','));
    }

    if (params.filters?.modelos?.length) {
      queryParams.append('modelos', params.filters.modelos.join(','));
    }

    if (params.filters?.anoMin) {
      queryParams.append('anoMin', params.filters.anoMin.toString());
    }

    if (params.filters?.anoMax) {
      queryParams.append('anoMax', params.filters.anoMax.toString());
    }

    if (params.filters?.precoMin) {
      queryParams.append('precoMin', params.filters.precoMin.toString());
    }

    if (params.filters?.precoMax) {
      queryParams.append('precoMax', params.filters.precoMax.toString());
    }

    if (params.filters?.cambios?.length) {
      queryParams.append('cambios', params.filters.cambios.join(','));
    }

    const response = await authenticatedClient.get(`/vehicle?${queryParams.toString()}`);
    return response.data.data;
  },

  async getFilterOptions(): Promise<FilterOptions> {
    const response = await authenticatedClient.get('/vehicle/filter-options');
    return response.data.data;
  },

  async getModelosByMarcas(marcas: string[]): Promise<string[]> {
    const queryParams = marcas.length ? `?marcas=${marcas.join(',')}` : '';
    const response = await authenticatedClient.get(`/vehicle/modelos-by-marcas${queryParams}`);
    return response.data.data.modelos;
  },
};
