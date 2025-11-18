import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Input } from '@/core/components/Input';
import { Label } from '@/core/components/Label';
import { formatCurrency } from '../../utils';
import type { VehicleDetailPaymentProps } from './types';

export const VehicleDetailPayment = ({
  vehicle,
  formasPagamento,
  condicaoFinanciamento,
  documentacao,
  situacaoDocumental,
}: VehicleDetailPaymentProps) => {
  const [entrada, setEntrada] = useState<number>(condicaoFinanciamento?.entradaMinima || 0);
  const [prazo, setPrazo] = useState<number>(condicaoFinanciamento?.prazoMaximo || 60);

  const calcularParcela = () => {
    if (!condicaoFinanciamento) return 0;
    const valorFinanciado = vehicle.preco - entrada;
    const taxaMensal = condicaoFinanciamento.taxaJuros / 100 / 12;
    const parcela =
      (valorFinanciado * taxaMensal * Math.pow(1 + taxaMensal, prazo)) /
      (Math.pow(1 + taxaMensal, prazo) - 1);
    return parcela;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'regular':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pendente':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'em_andamento':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'regular':
        return 'Regular';
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return status;
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Condições de Venda</h2>
      <div className="stack gap-6">
        <div className="stack gap-4">
          <h3 className="text-xl font-semibold">Formas de Pagamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formasPagamento.map((forma) => (
              <div
                key={forma.tipo}
                className={`border rounded-sm p-4 ${
                  forma.disponivel
                    ? 'border-[--color-primary-600] bg-[--color-primary-50]'
                    : 'border-[--color-border] opacity-50'
                }`}
              >
                <span className="font-medium">{forma.tipo}</span>
                {!forma.disponivel && (
                  <span className="text-sm text-[--color-muted-foreground] ml-2">
                    (Indisponível)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {condicaoFinanciamento && (
          <div className="stack gap-4">
            <h3 className="text-xl font-semibold">Simulador de Financiamento</h3>
            <div className="border border-[--color-border] rounded-sm p-4 stack gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="stack gap-2">
                  <Label htmlFor="entrada">Entrada (R$)</Label>
                  <Input
                    id="entrada"
                    type="number"
                    value={entrada}
                    onChange={(e) => setEntrada(parseFloat(e.target.value) || 0)}
                    min={condicaoFinanciamento.entradaMinima}
                    max={vehicle.preco}
                  />
                  <span className="text-sm text-[--color-muted-foreground]">
                    Mínimo: {formatCurrency(condicaoFinanciamento.entradaMinima)}
                  </span>
                </div>
                <div className="stack gap-2">
                  <Label htmlFor="prazo">Prazo (meses)</Label>
                  <Input
                    id="prazo"
                    type="number"
                    value={prazo}
                    onChange={(e) => setPrazo(parseInt(e.target.value) || 0)}
                    min={12}
                    max={condicaoFinanciamento.prazoMaximo}
                  />
                  <span className="text-sm text-[--color-muted-foreground]">
                    Máximo: {condicaoFinanciamento.prazoMaximo} meses
                  </span>
                </div>
              </div>
              <div className="border-t border-[--color-border] pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Valor Financiado:</span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(vehicle.preco - entrada)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Taxa de Juros:</span>
                  <span className="text-lg font-semibold">
                    {condicaoFinanciamento.taxaJuros}% a.a.
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Parcela Mensal:</span>
                  <span className="text-2xl font-bold text-[--color-primary-600]">
                    {formatCurrency(calcularParcela())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="stack gap-4">
          <h3 className="text-xl font-semibold">Aceita Troca</h3>
          <div
            className={`border rounded-sm p-4 ${
              vehicle.aceitaTroca ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <span className="font-medium">
              {vehicle.aceitaTroca ? '✓ Sim, aceita troca' : '✗ Não aceita troca'}
            </span>
          </div>
        </div>

        {vehicle.observacoesVenda && (
          <div className="stack gap-4">
            <h3 className="text-xl font-semibold">Observações</h3>
            <div className="border border-[--color-border] rounded-sm p-4">
              <p className="text-[--color-muted-foreground]">{vehicle.observacoesVenda}</p>
            </div>
          </div>
        )}

        <div className="stack gap-4">
          <h3 className="text-xl font-semibold">Documentação Necessária</h3>
          <ul className="stack gap-2">
            {documentacao.map((doc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[--color-primary-600] mt-1">•</span>
                <div className="stack gap-1">
                  <span className="font-medium">{doc.nome}</span>
                  {doc.observacoes && (
                    <span className="text-sm text-[--color-muted-foreground]">
                      {doc.observacoes}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="stack gap-4">
          <h3 className="text-xl font-semibold">Situação Documental</h3>
          <div className={`border rounded-sm p-4 ${getStatusColor(situacaoDocumental.status)}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">
                Status: {getStatusLabel(situacaoDocumental.status)}
              </span>
            </div>
            {situacaoDocumental.pendencias && situacaoDocumental.pendencias.length > 0 && (
              <div className="mt-3">
                <span className="font-medium">Pendências:</span>
                <ul className="mt-2 stack gap-1">
                  {situacaoDocumental.pendencias.map((pendencia, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span>•</span>
                      <span>{pendencia}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {situacaoDocumental.observacoes && (
              <p className="text-sm mt-3">{situacaoDocumental.observacoes}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
