/**
 * @interface VehicleDetail
 * @description Complete vehicle information
 *
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} modelo - Vehicle model
 * @property {string} marca - Vehicle brand
 * @property {number} anoFabricacao - Manufacturing year
 * @property {number} anoModelo - Model year
 * @property {number} preco - Vehicle price
 * @property {number} quilometragem - Vehicle mileage
 * @property {string} combustivel - Fuel type
 * @property {string} cambio - Transmission type
 * @property {string} potencia - Engine power
 * @property {string} cor - Vehicle color
 * @property {number} portas - Number of doors
 * @property {string} carroceria - Body type
 * @property {string} motor - Engine displacement
 * @property {number} finalPlaca - License plate final digit
 * @property {string} statusVeiculo - Vehicle status
 * @property {string} procedencia - Vehicle origin
 * @property {number} proprietarios - Number of previous owners
 * @property {string | null} garantia - Warranty information
 * @property {boolean} aceitaTroca - Accepts trade-in
 * @property {string | null} observacoesVenda - Sale observations
 * @property {string} tituloAnuncio - Advertisement title
 * @property {string} urlCompartilhamento - Sharing URL
 * @property {string} textoCompartilhamento - Sharing text
 */
export interface VehicleDetail {
  idVehicle: number;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  anoModelo: number;
  preco: number;
  quilometragem: number;
  combustivel: string;
  cambio: string;
  potencia: string;
  cor: string;
  portas: number;
  carroceria: string;
  motor: string;
  finalPlaca: number;
  statusVeiculo: string;
  procedencia: string;
  proprietarios: number;
  garantia: string | null;
  aceitaTroca: boolean;
  observacoesVenda: string | null;
  tituloAnuncio: string;
  urlCompartilhamento: string;
  textoCompartilhamento: string;
}

/**
 * @interface VehiclePhoto
 * @description Vehicle photo information
 *
 * @property {number} idVehiclePhoto - Photo identifier
 * @property {string} fotoUrl - Photo URL
 * @property {string | null} legenda - Photo caption
 * @property {boolean} principal - Is main photo
 * @property {number} ordem - Display order
 */
export interface VehiclePhoto {
  idVehiclePhoto: number;
  fotoUrl: string;
  legenda: string | null;
  principal: boolean;
  ordem: number;
}

/**
 * @interface VehicleItem
 * @description Vehicle item or optional
 *
 * @property {number} idVehicleItem - Item identifier
 * @property {string} descricao - Item description
 * @property {string} categoria - Item category
 * @property {boolean} serie - Is standard item
 */
export interface VehicleItem {
  idVehicleItem: number;
  descricao: string;
  categoria: string;
  serie: boolean;
}

/**
 * @interface VehicleRevisao
 * @description Vehicle maintenance record
 *
 * @property {number} idVehicleRevisao - Maintenance identifier
 * @property {string} dataRevisao - Maintenance date
 * @property {number} quilometragem - Mileage at maintenance
 * @property {string} local - Maintenance location
 */
export interface VehicleRevisao {
  idVehicleRevisao: number;
  dataRevisao: string;
  quilometragem: number;
  local: string;
}

/**
 * @interface VehicleSinistro
 * @description Vehicle accident record
 *
 * @property {number} idVehicleSinistro - Accident identifier
 * @property {string} dataSinistro - Accident date
 * @property {string} tipo - Accident type
 * @property {string} descricao - Accident description
 */
export interface VehicleSinistro {
  idVehicleSinistro: number;
  dataSinistro: string;
  tipo: string;
  descricao: string;
}

/**
 * @interface VehicleLaudoTecnico
 * @description Vehicle technical inspection report
 *
 * @property {number} idVehicleLaudoTecnico - Report identifier
 * @property {string} dataInspecao - Inspection date
 * @property {string} resultadoGeral - General result
 */
export interface VehicleLaudoTecnico {
  idVehicleLaudoTecnico: number;
  dataInspecao: string;
  resultadoGeral: string;
}

/**
 * @interface VehicleFormaPagamento
 * @description Vehicle payment method
 *
 * @property {number} idVehicleFormaPagamento - Payment method identifier
 * @property {string} formaPagamento - Payment method
 */
export interface VehicleFormaPagamento {
  idVehicleFormaPagamento: number;
  formaPagamento: string;
}

/**
 * @interface VehicleCondicaoFinanciamento
 * @description Vehicle financing conditions
 *
 * @property {number} idVehicleCondicaoFinanciamento - Financing condition identifier
 * @property {number} entradaMinima - Minimum down payment
 * @property {number} taxaJuros - Interest rate
 * @property {number} prazoMaximo - Maximum term
 */
export interface VehicleCondicaoFinanciamento {
  idVehicleCondicaoFinanciamento: number;
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

/**
 * @interface VehicleDocumentacao
 * @description Required vehicle documentation
 *
 * @property {number} idVehicleDocumentacao - Documentation identifier
 * @property {string} nomeDocumento - Document name
 * @property {string | null} observacoes - Document observations
 */
export interface VehicleDocumentacao {
  idVehicleDocumentacao: number;
  nomeDocumento: string;
  observacoes: string | null;
}

/**
 * @interface VehicleSituacaoDocumental
 * @description Vehicle document status
 *
 * @property {number} idVehicleSituacaoDocumental - Document status identifier
 * @property {string} statusRegularizacao - Regularization status
 * @property {string | null} pendencias - Pending issues
 * @property {string | null} observacoes - Status observations
 */
export interface VehicleSituacaoDocumental {
  idVehicleSituacaoDocumental: number;
  statusRegularizacao: string;
  pendencias: string | null;
  observacoes: string | null;
}

/**
 * @interface VehicleDetailResponse
 * @description Complete vehicle details response structure
 *
 * @property {VehicleDetail} vehicle - Vehicle basic information
 * @property {VehiclePhoto[]} photos - Vehicle photo gallery
 * @property {VehicleItem[]} items - Vehicle items and optionals
 * @property {VehicleRevisao[]} revisoes - Maintenance history
 * @property {VehicleSinistro[]} sinistros - Accident history
 * @property {VehicleLaudoTecnico | null} laudoTecnico - Technical inspection report
 * @property {VehicleFormaPagamento[]} formasPagamento - Payment methods
 * @property {VehicleCondicaoFinanciamento | null} condicaoFinanciamento - Financing conditions
 * @property {VehicleDocumentacao[]} documentacao - Required documentation
 * @property {VehicleSituacaoDocumental | null} situacaoDocumental - Document status
 */
export interface VehicleDetailResponse {
  vehicle: VehicleDetail;
  photos: VehiclePhoto[];
  items: VehicleItem[];
  revisoes: VehicleRevisao[];
  sinistros: VehicleSinistro[];
  laudoTecnico: VehicleLaudoTecnico | null;
  formasPagamento: VehicleFormaPagamento[];
  condicaoFinanciamento: VehicleCondicaoFinanciamento | null;
  documentacao: VehicleDocumentacao[];
  situacaoDocumental: VehicleSituacaoDocumental | null;
}
