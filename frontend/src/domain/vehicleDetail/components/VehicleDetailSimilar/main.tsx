import { VehicleGrid, useVehicleList } from '@/domain/vehicle';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { VehicleDetailSimilarProps } from './types';

export const VehicleDetailSimilar = ({
  vehicleId,
  marca,
  modelo,
  preco,
}: VehicleDetailSimilarProps) => {
  const precoMin = preco * 0.7;
  const precoMax = preco * 1.3;

  const { vehicles, isLoading } = useVehicleList({
    params: {
      page: 1,
      pageSize: 6,
      filters: {
        marcas: [marca],
        precoMin,
        precoMax,
      },
      sortOrder: 'relevancia',
    },
  });

  const similarVehicles = vehicles.filter((v) => v.id !== vehicleId).slice(0, 6);

  if (isLoading) {
    return (
      <div className="center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (similarVehicles.length === 0) {
    return null;
  }

  return (
    <section className="stack gap-6">
      <h2 className="text-2xl font-bold">Veículos Similares</h2>
      <VehicleGrid vehicles={similarVehicles} />
    </section>
  );
};
