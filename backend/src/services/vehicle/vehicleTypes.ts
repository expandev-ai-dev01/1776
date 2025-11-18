/**
 * @interface Vehicle
 * @description Represents a vehicle entity in the catalog
 *
 * @property {string} id - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name
 * @property {string} marca - Vehicle brand/manufacturer
 * @property {number} ano - Manufacturing year
 * @property {number} preco - Vehicle price in BRL
 * @property {string} imagemPrincipal - URL of the main vehicle image
 * @property {number | null} quilometragem - Vehicle mileage in kilometers
 * @property {string | null} cambio - Transmission type
 */
export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem: number | null;
  cambio: string | null;
}

/**
 * @interface VehicleFilters
 * @description Filter criteria for vehicle listing
 *
 * @property {string[]} [marcas] - Filter by brands
 * @property {string[]} [modelos] - Filter by models
 * @property {number} [anoMin] - Minimum year filter
 * @property {number} [anoMax] - Maximum year filter
 * @property {number} [precoMin] - Minimum price filter
 * @property {number} [precoMax] - Maximum price filter
 * @property {string[]} [cambios] - Filter by transmission types
 */
export interface VehicleFilters {
  marcas?: string[];
  modelos?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambios?: string[];
}

/**
 * @enum SortOrder
 * @description Available sorting options for vehicle listing
 */
export enum SortOrder {
  Relevancia = 'relevancia',
  PrecoAsc = 'preco_asc',
  PrecoDesc = 'preco_desc',
  AnoDesc = 'ano_desc',
  AnoAsc = 'ano_asc',
  ModeloAsc = 'modelo_asc',
  ModeloDesc = 'modelo_desc',
}

/**
 * @interface VehicleListParams
 * @description Parameters for vehicle listing with pagination, filtering and sorting
 *
 * @property {number} [page] - Current page number (default: 1)
 * @property {number} [pageSize] - Items per page (default: 12)
 * @property {VehicleFilters} [filters] - Filter criteria
 * @property {SortOrder} [sortOrder] - Sorting order
 */
export interface VehicleListParams {
  page?: number;
  pageSize?: number;
  filters?: VehicleFilters;
  sortOrder?: SortOrder;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 *
 * @property {Vehicle[]} vehicles - Array of vehicles
 * @property {number} total - Total number of vehicles matching filters
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total number of pages
 */
export interface VehicleListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @interface FilterOptions
 * @description Available filter options based on current catalog
 *
 * @property {string[]} marcas - Available brands
 * @property {string[]} modelos - Available models
 * @property {number[]} anos - Available years
 * @property {string[]} cambios - Available transmission types
 */
export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
}
