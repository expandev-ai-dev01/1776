import { Card } from '@/core/components/Card';
import { formatNumber } from '../../utils';
import type { VehicleDetailSpecsProps } from './types';

export const VehicleDetailSpecs = ({ vehicle }: VehicleDetailSpecsProps) => {
  const specs = [
    { label: 'Marca', value: vehicle.marca },
    { label: 'Modelo', value: vehicle.modelo },
    { label: 'Ano Fabricação', value: vehicle.anoFabricacao },
    { label: 'Ano Modelo', value: vehicle.anoModelo },
    { label: 'Quilometragem', value: `${formatNumber(vehicle.quilometragem)} km` },
    { label: 'Combustível', value: vehicle.combustivel },
    { label: 'Câmbio', value: vehicle.cambio },
    { label: 'Potência', value: vehicle.potencia },
    { label: 'Cor', value: vehicle.cor },
    { label: 'Portas', value: vehicle.portas },
    { label: 'Carroceria', value: vehicle.carroceria },
    { label: 'Motor', value: vehicle.motor },
    { label: 'Final da Placa', value: vehicle.finalPlaca },
  ];

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Especificações Técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between py-2 border-b border-[--color-border]"
          >
            <span className="font-medium text-[--color-muted-foreground]">{spec.label}:</span>
            <span className="font-semibold">{spec.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
