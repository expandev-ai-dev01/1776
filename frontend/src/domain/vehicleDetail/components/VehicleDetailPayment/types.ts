import type {
  VehicleDetail,
  VehicleFormaPagamento,
  VehicleCondicaoFinanciamento,
  VehicleDocumentacao,
  VehicleSituacaoDocumental,
} from '../../types';

export interface VehicleDetailPaymentProps {
  vehicle: VehicleDetail;
  formasPagamento: VehicleFormaPagamento[];
  condicaoFinanciamento?: VehicleCondicaoFinanciamento;
  documentacao: VehicleDocumentacao[];
  situacaoDocumental: VehicleSituacaoDocumental;
}
