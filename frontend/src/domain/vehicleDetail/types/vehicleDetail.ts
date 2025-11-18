export interface VehiclePhoto {
  id: number;
  url: string;
  legenda?: string;
  ordem: number;
}

export interface VehicleItem {
  id: number;
  nome: string;
  categoria: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
  tipo: 'serie' | 'opcional';
}

export interface VehicleRevisao {
  id: number;
  data: string;
  quilometragem: number;
  local: string;
  descricao?: string;
}

export interface VehicleSinistro {
  id: number;
  data: string;
  tipo: string;
  descricao: string;
}

export interface VehicleLaudoTecnico {
  dataInspecao: string;
  resultadoGeral: string;
  observacoes?: string;
}

export interface VehicleFormaPagamento {
  tipo: 'À vista' | 'Financiamento' | 'Consórcio' | 'Leasing';
  disponivel: boolean;
}

export interface VehicleCondicaoFinanciamento {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

export interface VehicleDocumentacao {
  nome: string;
  observacoes?: string;
}

export interface VehicleSituacaoDocumental {
  status: 'regular' | 'pendente' | 'em_andamento';
  pendencias?: string[];
  observacoes?: string;
}

export interface VehicleDetail {
  id: string;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  finalPlaca: number;
  preco: number;
  status: 'Disponível' | 'Reservado' | 'Vendido';
  procedencia: string;
  proprietarios: number;
  garantia?: string;
  aceitaTroca: boolean;
  observacoesVenda?: string;
}

export interface VehicleDetailResponse {
  vehicle: VehicleDetail;
  photos: VehiclePhoto[];
  items: VehicleItem[];
  revisoes: VehicleRevisao[];
  sinistros: VehicleSinistro[];
  laudoTecnico?: VehicleLaudoTecnico;
  formasPagamento: VehicleFormaPagamento[];
  condicaoFinanciamento?: VehicleCondicaoFinanciamento;
  documentacao: VehicleDocumentacao[];
  situacaoDocumental: VehicleSituacaoDocumental;
}
