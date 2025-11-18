import type {
  VehicleDetail,
  VehicleRevisao,
  VehicleSinistro,
  VehicleLaudoTecnico,
} from '../../types';

export interface VehicleDetailHistoryProps {
  vehicle: VehicleDetail;
  revisoes: VehicleRevisao[];
  sinistros: VehicleSinistro[];
  laudoTecnico?: VehicleLaudoTecnico;
}
