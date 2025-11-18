import {
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
} from './vehicleDetailTypes';

/**
 * @summary
 * Mock data storage for vehicle details
 * In production, this would be replaced with actual database calls
 */
const vehicleDetailsData: Map<number, VehicleDetailResponse> = new Map([
  [
    1,
    {
      vehicle: {
        idVehicle: 1,
        modelo: 'Civic',
        marca: 'Honda',
        anoFabricacao: 2023,
        anoModelo: 2023,
        preco: 145000,
        quilometragem: 5000,
        combustivel: 'Flex',
        cambio: 'Automático',
        potencia: '155 cv',
        cor: 'Prata',
        portas: 4,
        carroceria: 'Sedan',
        motor: '2.0',
        finalPlaca: 1,
        statusVeiculo: 'Disponível',
        procedencia: 'Concessionária',
        proprietarios: 0,
        garantia: '3 anos ou 100.000 km',
        aceitaTroca: true,
        observacoesVenda: 'Aceita veículo como parte do pagamento',
        tituloAnuncio: 'Honda Civic 2023',
        urlCompartilhamento: '/veiculos/honda-civic-2023-1',
        textoCompartilhamento: 'Confira este Honda Civic 2023 por R$ 145.000,00',
      },
      photos: [
        {
          idVehiclePhoto: 1,
          fotoUrl: 'https://example.com/civic-front.jpg',
          legenda: 'Vista frontal',
          principal: true,
          ordem: 1,
        },
        {
          idVehiclePhoto: 2,
          fotoUrl: 'https://example.com/civic-side.jpg',
          legenda: 'Vista lateral',
          principal: false,
          ordem: 2,
        },
        {
          idVehiclePhoto: 3,
          fotoUrl: 'https://example.com/civic-interior.jpg',
          legenda: 'Interior',
          principal: false,
          ordem: 3,
        },
      ],
      items: [
        {
          idVehicleItem: 1,
          descricao: 'Ar-condicionado digital',
          categoria: 'Conforto',
          serie: true,
        },
        {
          idVehicleItem: 2,
          descricao: 'Bancos de couro',
          categoria: 'Conforto',
          serie: true,
        },
        {
          idVehicleItem: 3,
          descricao: 'Freios ABS',
          categoria: 'Segurança',
          serie: true,
        },
        {
          idVehicleItem: 4,
          descricao: 'Airbags frontais e laterais',
          categoria: 'Segurança',
          serie: true,
        },
        {
          idVehicleItem: 5,
          descricao: 'Central multimídia',
          categoria: 'Tecnologia',
          serie: true,
        },
        {
          idVehicleItem: 6,
          descricao: 'Sensor de estacionamento',
          categoria: 'Tecnologia',
          serie: false,
        },
      ],
      revisoes: [
        {
          idVehicleRevisao: 1,
          dataRevisao: '2023-06-15',
          quilometragem: 5000,
          local: 'Concessionária Honda',
        },
      ],
      sinistros: [],
      laudoTecnico: {
        idVehicleLaudoTecnico: 1,
        dataInspecao: '2023-11-01',
        resultadoGeral: 'Aprovado - Veículo em excelente estado',
      },
      formasPagamento: [
        { idVehicleFormaPagamento: 1, formaPagamento: 'À vista' },
        { idVehicleFormaPagamento: 2, formaPagamento: 'Financiamento' },
      ],
      condicaoFinanciamento: {
        idVehicleCondicaoFinanciamento: 1,
        entradaMinima: 29000,
        taxaJuros: 1.99,
        prazoMaximo: 60,
      },
      documentacao: [
        {
          idVehicleDocumentacao: 1,
          nomeDocumento: 'RG e CPF',
          observacoes: 'Documentos originais',
        },
        {
          idVehicleDocumentacao: 2,
          nomeDocumento: 'Comprovante de residência',
          observacoes: 'Atualizado (últimos 3 meses)',
        },
        {
          idVehicleDocumentacao: 3,
          nomeDocumento: 'Comprovante de renda',
          observacoes: 'Para financiamento',
        },
      ],
      situacaoDocumental: {
        idVehicleSituacaoDocumental: 1,
        statusRegularizacao: 'Regular',
        pendencias: null,
        observacoes: 'Toda documentação em dia',
      },
    },
  ],
]);

/**
 * @summary
 * Retrieves complete vehicle details by ID
 *
 * @function vehicleGet
 * @module vehicleDetail
 *
 * @param {number} idVehicle - Vehicle identifier
 *
 * @returns {Promise<VehicleDetailResponse>} Complete vehicle details
 *
 * @throws {Error} When vehicle is not found
 *
 * @example
 * const details = await vehicleGet(1);
 */
export async function vehicleGet(idVehicle: number): Promise<VehicleDetailResponse> {
  const vehicleData = vehicleDetailsData.get(idVehicle);

  if (!vehicleData) {
    throw new Error('vehicleNotFound');
  }

  return vehicleData;
}
