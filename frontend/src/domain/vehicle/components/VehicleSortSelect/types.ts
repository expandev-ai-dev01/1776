import type { SortOrder } from '../../types';

export interface VehicleSortSelectProps {
  sortOrder: SortOrder;
  onSortChange: (sortOrder: SortOrder) => void;
}
