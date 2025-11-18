export type {
  Vehicle,
  VehicleFilters,
  SortOrder,
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
} from './types';

export { vehicleService } from './services';

export {
  useVehicleList,
  useFilterOptions,
  useModelosByMarcas,
  type UseVehicleListOptions,
  type UseVehicleListReturn,
  type UseFilterOptionsReturn,
  type UseModelosByMarcasOptions,
  type UseModelosByMarcasReturn,
} from './hooks';

export {
  VehicleCard,
  VehicleFilters,
  VehicleGrid,
  VehiclePagination,
  VehicleSortSelect,
  type VehicleCardProps,
  type VehicleFiltersProps,
  type VehicleGridProps,
  type VehiclePaginationProps,
  type VehicleSortSelectProps,
} from './components';

export { formatPrice, formatKilometers, formatYear } from './utils';
