import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseModelosByMarcasOptions, UseModelosByMarcasReturn } from './types';

export const useModelosByMarcas = (
  options: UseModelosByMarcasOptions
): UseModelosByMarcasReturn => {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicle-modelos-by-marcas', options.marcas],
    queryFn: () => vehicleService.getModelosByMarcas(options.marcas),
    enabled: options.marcas.length > 0,
  });

  return {
    modelos: data || [],
    isLoading,
  };
};
