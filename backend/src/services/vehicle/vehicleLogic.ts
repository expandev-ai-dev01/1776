import {
  Vehicle,
  VehicleFilters,
  VehicleListParams,
  VehicleListResponse,
  SortOrder,
  FilterOptions,
} from './vehicleTypes';

/**
 * @summary
 * In-memory storage for vehicle catalog data
 */
const vehicles: Vehicle[] = [
  {
    id: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 145000,
    imagemPrincipal: 'https://example.com/civic.jpg',
    quilometragem: 5000,
    cambio: 'Automático',
  },
  {
    id: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 135000,
    imagemPrincipal: 'https://example.com/corolla.jpg',
    quilometragem: 15000,
    cambio: 'CVT',
  },
  {
    id: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 85000,
    imagemPrincipal: 'https://example.com/onix.jpg',
    quilometragem: 2000,
    cambio: 'Manual',
  },
  {
    id: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2021,
    preco: 75000,
    imagemPrincipal: 'https://example.com/hb20.jpg',
    quilometragem: 30000,
    cambio: 'Manual',
  },
  {
    id: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000,
    imagemPrincipal: 'https://example.com/compass.jpg',
    quilometragem: 8000,
    cambio: 'Automático',
  },
];

/**
 * @summary
 * Applies filters to vehicle array
 *
 * @function applyFilters
 * @module vehicle
 *
 * @param {Vehicle[]} vehicleList - Array of vehicles to filter
 * @param {VehicleFilters} filters - Filter criteria
 *
 * @returns {Vehicle[]} Filtered vehicle array
 */
function applyFilters(vehicleList: Vehicle[], filters: VehicleFilters): Vehicle[] {
  let filtered = [...vehicleList];

  if (filters.marcas && filters.marcas.length > 0) {
    filtered = filtered.filter((v) => filters.marcas!.includes(v.marca));
  }

  if (filters.modelos && filters.modelos.length > 0) {
    filtered = filtered.filter((v) => filters.modelos!.includes(v.modelo));
  }

  if (filters.anoMin !== undefined) {
    filtered = filtered.filter((v) => v.ano >= filters.anoMin!);
  }

  if (filters.anoMax !== undefined) {
    filtered = filtered.filter((v) => v.ano <= filters.anoMax!);
  }

  if (filters.precoMin !== undefined) {
    filtered = filtered.filter((v) => v.preco >= filters.precoMin!);
  }

  if (filters.precoMax !== undefined) {
    filtered = filtered.filter((v) => v.preco <= filters.precoMax!);
  }

  if (filters.cambios && filters.cambios.length > 0) {
    filtered = filtered.filter((v) => v.cambio && filters.cambios!.includes(v.cambio));
  }

  return filtered;
}

/**
 * @summary
 * Applies sorting to vehicle array
 *
 * @function applySorting
 * @module vehicle
 *
 * @param {Vehicle[]} vehicleList - Array of vehicles to sort
 * @param {SortOrder} sortOrder - Sorting criteria
 *
 * @returns {Vehicle[]} Sorted vehicle array
 */
function applySorting(vehicleList: Vehicle[], sortOrder: SortOrder): Vehicle[] {
  const sorted = [...vehicleList];

  switch (sortOrder) {
    case SortOrder.PrecoAsc:
      return sorted.sort((a, b) => a.preco - b.preco);
    case SortOrder.PrecoDesc:
      return sorted.sort((a, b) => b.preco - a.preco);
    case SortOrder.AnoDesc:
      return sorted.sort((a, b) => b.ano - a.ano);
    case SortOrder.AnoAsc:
      return sorted.sort((a, b) => a.ano - b.ano);
    case SortOrder.ModeloAsc:
      return sorted.sort((a, b) => a.modelo.localeCompare(b.modelo));
    case SortOrder.ModeloDesc:
      return sorted.sort((a, b) => b.modelo.localeCompare(a.modelo));
    case SortOrder.Relevancia:
    default:
      return sorted;
  }
}

/**
 * @summary
 * Retrieves paginated vehicle list with filtering and sorting
 *
 * @function vehicleList
 * @module vehicle
 *
 * @param {VehicleListParams} params - List parameters including pagination, filters and sorting
 *
 * @returns {Promise<VehicleListResponse>} Paginated vehicle list with metadata
 *
 * @example
 * const result = await vehicleList({
 *   page: 1,
 *   pageSize: 12,
 *   filters: { marcas: ['Honda', 'Toyota'] },
 *   sortOrder: SortOrder.PrecoAsc
 * });
 */
export async function vehicleList(params: VehicleListParams): Promise<VehicleListResponse> {
  const page = params.page || 1;
  const pageSize = params.pageSize || 12;
  const filters = params.filters || {};
  const sortOrder = params.sortOrder || SortOrder.Relevancia;

  let filtered = applyFilters(vehicles, filters);
  filtered = applySorting(filtered, sortOrder);

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVehicles = filtered.slice(startIndex, endIndex);

  return {
    vehicles: paginatedVehicles,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * @summary
 * Retrieves available filter options based on current catalog
 *
 * @function getFilterOptions
 * @module vehicle
 *
 * @returns {Promise<FilterOptions>} Available filter options
 *
 * @example
 * const options = await getFilterOptions();
 */
export async function getFilterOptions(): Promise<FilterOptions> {
  const marcas = Array.from(new Set(vehicles.map((v) => v.marca))).sort();
  const modelos = Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  const anos = Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a);
  const cambios = Array.from(
    new Set(vehicles.map((v) => v.cambio).filter((c) => c !== null) as string[])
  ).sort();

  return {
    marcas,
    modelos,
    anos,
    cambios,
  };
}

/**
 * @summary
 * Retrieves models filtered by selected brands
 *
 * @function getModelosByMarcas
 * @module vehicle
 *
 * @param {string[]} marcas - Array of selected brands
 *
 * @returns {Promise<string[]>} Array of available models for selected brands
 *
 * @example
 * const modelos = await getModelosByMarcas(['Honda', 'Toyota']);
 */
export async function getModelosByMarcas(marcas: string[]): Promise<string[]> {
  if (!marcas || marcas.length === 0) {
    return Array.from(new Set(vehicles.map((v) => v.modelo))).sort();
  }

  const filtered = vehicles.filter((v) => marcas.includes(v.marca));
  return Array.from(new Set(filtered.map((v) => v.modelo))).sort();
}
