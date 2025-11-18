import { Link } from 'react-router-dom';
import { Card } from '@/core/components/Card';
import { formatPrice, formatKilometers, formatYear } from '../../utils';
import type { VehicleCardProps } from './types';

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Link to={`/vehicle/${vehicle.id}`} className="block">
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="stack gap-4">
          <div className="aspect-video w-full overflow-hidden rounded-sm bg-[--color-muted]">
            <img
              src={vehicle.imagem_principal}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="stack gap-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {vehicle.marca} {vehicle.modelo}
            </h3>

            <div className="flex items-center justify-between text-sm text-[--color-muted-foreground]">
              <span>{formatYear(vehicle.ano)}</span>
              {vehicle.quilometragem && <span>{formatKilometers(vehicle.quilometragem)}</span>}
            </div>

            {vehicle.cambio && (
              <p className="text-sm text-[--color-muted-foreground]">{vehicle.cambio}</p>
            )}

            <p className="text-xl font-bold text-[--color-primary-600] mt-2">
              {formatPrice(vehicle.preco)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
