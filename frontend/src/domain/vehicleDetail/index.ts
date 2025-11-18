export type {
  VehicleDetail,
  VehiclePhoto,
  VehicleItem,
  VehicleRevisao,
  VehicleSinistro,
  VehicleLaudoTecnico,
  VehicleFormaPagamento,
  VehicleCondicaoFinanciamento,
  VehicleDocumentacao,
  VehicleSituacaoDocumental,
  VehicleDetailResponse,
} from './types';

export { vehicleDetailService } from './services';

export {
  useVehicleDetail,
  type UseVehicleDetailOptions,
  type UseVehicleDetailReturn,
} from './hooks';

export {
  VehicleDetailGallery,
  VehicleDetailSpecs,
  VehicleDetailItems,
  VehicleDetailHistory,
  VehicleDetailPayment,
  VehicleDetailSimilar,
  VehicleDetailContact,
  type VehicleDetailGalleryProps,
  type VehicleDetailSpecsProps,
  type VehicleDetailItemsProps,
  type VehicleDetailHistoryProps,
  type VehicleDetailPaymentProps,
  type VehicleDetailSimilarProps,
  type VehicleDetailContactProps,
} from './components';

export { formatCurrency, formatNumber, formatDate } from './utils';
