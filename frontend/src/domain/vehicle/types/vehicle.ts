export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: string;
}

export interface VehicleFilters {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
}

export type SortOrder =
  | 'relevancia'
  | 'preco_asc'
  | 'preco_desc'
  | 'ano_desc'
  | 'ano_asc'
  | 'modelo_asc'
  | 'modelo_desc';

export interface VehicleListParams {
  page: number;
  pageSize: number;
  filters?: VehicleFilters;
  sortOrder?: SortOrder;
}

export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}
