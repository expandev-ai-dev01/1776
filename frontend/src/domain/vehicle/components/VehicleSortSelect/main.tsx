import { Label } from '@/core/components/Label';
import type { VehicleSortSelectProps } from './types';
import type { SortOrder } from '../../types';

export const VehicleSortSelect = ({ sortOrder, onSortChange }: VehicleSortSelectProps) => {
  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'relevancia', label: 'Relevância' },
    { value: 'preco_asc', label: 'Preço (menor para maior)' },
    { value: 'preco_desc', label: 'Preço (maior para menor)' },
    { value: 'ano_desc', label: 'Ano (mais recente)' },
    { value: 'ano_asc', label: 'Ano (mais antigo)' },
    { value: 'modelo_asc', label: 'Modelo (A-Z)' },
    { value: 'modelo_desc', label: 'Modelo (Z-A)' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort-select">Ordenar por:</Label>
      <select
        id="sort-select"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="h-10 rounded-sm border border-[--color-input] bg-[--color-background] px-3 text-sm min-w-[200px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
