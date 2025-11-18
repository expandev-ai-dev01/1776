import { VehicleCard } from '../VehicleCard';
import type { VehicleGridProps } from './types';

export const VehicleGrid = ({ vehicles }: VehicleGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
