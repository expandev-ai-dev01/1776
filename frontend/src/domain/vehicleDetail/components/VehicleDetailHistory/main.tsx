import { Card } from '@/core/components/Card';
import { formatDate, formatNumber } from '../../utils';
import type { VehicleDetailHistoryProps } from './types';

export const VehicleDetailHistory = ({
  vehicle,
  revisoes,
  sinistros,
  laudoTecnico,
}: VehicleDetailHistoryProps) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Histórico do Veículo</h2>
      <div className="stack gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="stack gap-2">
            <span className="font-medium text-[--color-muted-foreground]">Procedência:</span>
            <span className="font-semibold">{vehicle.procedencia}</span>
          </div>
          <div className="stack gap-2">
            <span className="font-medium text-[--color-muted-foreground]">Proprietários:</span>
            <span className="font-semibold">{vehicle.proprietarios}</span>
          </div>
          {vehicle.garantia && (
            <div className="stack gap-2">
              <span className="font-medium text-[--color-muted-foreground]">Garantia:</span>
              <span className="font-semibold">{vehicle.garantia}</span>
            </div>
          )}
        </div>

        {sinistros.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4">
            <p className="text-green-800 font-medium">✓ Sem registro de sinistros</p>
          </div>
        )}

        {revisoes.length > 0 && (
          <div className="stack gap-4">
            <h3 className="text-xl font-semibold">Revisões</h3>
            <div className="stack gap-3">
              {revisoes.map((revisao) => (
                <div key={revisao.id} className="border border-[--color-border] rounded-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{formatDate(revisao.data)}</span>
                    <span className="text-[--color-muted-foreground]">
                      {formatNumber(revisao.quilometragem)} km
                    </span>
                  </div>
                  <p className="text-sm text-[--color-muted-foreground]">{revisao.local}</p>
                  {revisao.descricao && <p className="text-sm mt-2">{revisao.descricao}</p>}
                </div>
              ))}
            </div>
            {revisoes.every((r) => r.local.toLowerCase().includes('concessionária')) && (
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                <p className="text-blue-800 font-medium">✓ Revisões em dia na concessionária</p>
              </div>
            )}
          </div>
        )}

        {sinistros.length > 0 && (
          <div className="stack gap-4">
            <h3 className="text-xl font-semibold">Sinistros</h3>
            <div className="stack gap-3">
              {sinistros.map((sinistro) => (
                <div key={sinistro.id} className="border border-[--color-border] rounded-sm p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{formatDate(sinistro.data)}</span>
                    <span className="text-[--color-destructive]">{sinistro.tipo}</span>
                  </div>
                  <p className="text-sm">{sinistro.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {laudoTecnico && (
          <div className="stack gap-4">
            <h3 className="text-xl font-semibold">Laudo Técnico</h3>
            <div className="border border-[--color-border] rounded-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Data da Inspeção:</span>
                <span>{formatDate(laudoTecnico.dataInspecao)}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">Resultado Geral:</span>
                <span className="font-semibold">{laudoTecnico.resultadoGeral}</span>
              </div>
              {laudoTecnico.observacoes && (
                <div className="mt-4">
                  <span className="font-medium">Observações:</span>
                  <p className="text-sm text-[--color-muted-foreground] mt-1">
                    {laudoTecnico.observacoes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
