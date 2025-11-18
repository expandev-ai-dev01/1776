/**
 * @summary
 * Retrieves complete vehicle details including all related information
 * such as photos, items, maintenance history, payment conditions, and documentation
 *
 * @procedure spVehicleGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/vehicle/:id
 *
 * @parameters
 * @param {INT} idVehicle
 *   - Required: Yes
 *   - Description: Vehicle identifier
 *
 * @testScenarios
 * - Valid vehicle ID returns complete details
 * - Invalid vehicle ID returns error
 * - Vehicle with all related data returns complete structure
 * - Vehicle with minimal data returns basic structure
 */
CREATE OR ALTER PROCEDURE [functional].[spVehicleGet]
  @idVehicle INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Verify vehicle exists
   * @throw {vehicleNotFound}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[vehicle] [veh] WHERE [veh].[idVehicle] = @idVehicle)
  BEGIN
    THROW 51000, 'vehicleNotFound', 1;
  END;

  /**
   * @output {VehicleDetails, 1, n}
   * @column {INT} idVehicle - Vehicle identifier
   * @column {NVARCHAR} modelo - Vehicle model
   * @column {NVARCHAR} marca - Vehicle brand
   * @column {INT} anoFabricacao - Manufacturing year
   * @column {INT} anoModelo - Model year
   * @column {NUMERIC} preco - Vehicle price
   * @column {INT} quilometragem - Vehicle mileage
   * @column {NVARCHAR} combustivel - Fuel type
   * @column {NVARCHAR} cambio - Transmission type
   * @column {NVARCHAR} potencia - Engine power
   * @column {NVARCHAR} cor - Vehicle color
   * @column {INT} portas - Number of doors
   * @column {NVARCHAR} carroceria - Body type
   * @column {NVARCHAR} motor - Engine displacement
   * @column {INT} finalPlaca - License plate final digit
   * @column {NVARCHAR} statusVeiculo - Vehicle status
   * @column {NVARCHAR} procedencia - Vehicle origin
   * @column {INT} proprietarios - Number of previous owners
   * @column {NVARCHAR} garantia - Warranty information
   * @column {BIT} aceitaTroca - Accepts trade-in
   * @column {NVARCHAR} observacoesVenda - Sale observations
   * @column {NVARCHAR} tituloAnuncio - Advertisement title
   * @column {NVARCHAR} urlCompartilhamento - Sharing URL
   * @column {NVARCHAR} textoCompartilhamento - Sharing text
   */
  SELECT
    [veh].[idVehicle],
    [veh].[modelo],
    [veh].[marca],
    [veh].[anoFabricacao],
    [veh].[anoModelo],
    [veh].[preco],
    [veh].[quilometragem],
    [veh].[combustivel],
    [veh].[cambio],
    [veh].[potencia],
    [veh].[cor],
    [veh].[portas],
    [veh].[carroceria],
    [veh].[motor],
    [veh].[finalPlaca],
    [veh].[statusVeiculo],
    [veh].[procedencia],
    [veh].[proprietarios],
    [veh].[garantia],
    [veh].[aceitaTroca],
    [veh].[observacoesVenda],
    [veh].[tituloAnuncio],
    [veh].[urlCompartilhamento],
    [veh].[textoCompartilhamento]
  FROM [functional].[vehicle] [veh]
  WHERE [veh].[idVehicle] = @idVehicle;

  /**
   * @output {VehiclePhotos, n, n}
   * @column {INT} idVehiclePhoto - Photo identifier
   * @column {NVARCHAR} fotoUrl - Photo URL
   * @column {NVARCHAR} legenda - Photo caption
   * @column {BIT} principal - Is main photo
   * @column {INT} ordem - Display order
   */
  SELECT
    [vehPht].[idVehiclePhoto],
    [vehPht].[fotoUrl],
    [vehPht].[legenda],
    [vehPht].[principal],
    [vehPht].[ordem]
  FROM [functional].[vehiclePhoto] [vehPht]
  WHERE [vehPht].[idVehicle] = @idVehicle
  ORDER BY [vehPht].[ordem];

  /**
   * @output {VehicleItems, n, n}
   * @column {INT} idVehicleItem - Item identifier
   * @column {NVARCHAR} descricao - Item description
   * @column {NVARCHAR} categoria - Item category
   * @column {BIT} serie - Is standard item
   */
  SELECT
    [vehItm].[idVehicleItem],
    [vehItm].[descricao],
    [vehItm].[categoria],
    [vehItm].[serie]
  FROM [functional].[vehicleItem] [vehItm]
  WHERE [vehItm].[idVehicle] = @idVehicle
  ORDER BY [vehItm].[categoria], [vehItm].[descricao];

  /**
   * @output {VehicleRevisoes, n, n}
   * @column {INT} idVehicleRevisao - Maintenance identifier
   * @column {DATE} dataRevisao - Maintenance date
   * @column {INT} quilometragem - Mileage at maintenance
   * @column {NVARCHAR} local - Maintenance location
   */
  SELECT
    [vehRev].[idVehicleRevisao],
    [vehRev].[dataRevisao],
    [vehRev].[quilometragem],
    [vehRev].[local]
  FROM [functional].[vehicleRevisao] [vehRev]
  WHERE [vehRev].[idVehicle] = @idVehicle
  ORDER BY [vehRev].[dataRevisao] DESC;

  /**
   * @output {VehicleSinistros, n, n}
   * @column {INT} idVehicleSinistro - Accident identifier
   * @column {DATE} dataSinistro - Accident date
   * @column {NVARCHAR} tipo - Accident type
   * @column {NVARCHAR} descricao - Accident description
   */
  SELECT
    [vehSin].[idVehicleSinistro],
    [vehSin].[dataSinistro],
    [vehSin].[tipo],
    [vehSin].[descricao]
  FROM [functional].[vehicleSinistro] [vehSin]
  WHERE [vehSin].[idVehicle] = @idVehicle
  ORDER BY [vehSin].[dataSinistro] DESC;

  /**
   * @output {VehicleLaudoTecnico, n, n}
   * @column {INT} idVehicleLaudoTecnico - Technical report identifier
   * @column {DATE} dataInspecao - Inspection date
   * @column {NVARCHAR} resultadoGeral - General result
   */
  SELECT
    [vehLau].[idVehicleLaudoTecnico],
    [vehLau].[dataInspecao],
    [vehLau].[resultadoGeral]
  FROM [functional].[vehicleLaudoTecnico] [vehLau]
  WHERE [vehLau].[idVehicle] = @idVehicle;

  /**
   * @output {VehicleFormasPagamento, n, n}
   * @column {INT} idVehicleFormaPagamento - Payment method identifier
   * @column {NVARCHAR} formaPagamento - Payment method
   */
  SELECT
    [vehFrmPag].[idVehicleFormaPagamento],
    [vehFrmPag].[formaPagamento]
  FROM [functional].[vehicleFormaPagamento] [vehFrmPag]
  WHERE [vehFrmPag].[idVehicle] = @idVehicle;

  /**
   * @output {VehicleCondicaoFinanciamento, n, n}
   * @column {INT} idVehicleCondicaoFinanciamento - Financing condition identifier
   * @column {NUMERIC} entradaMinima - Minimum down payment
   * @column {NUMERIC} taxaJuros - Interest rate
   * @column {INT} prazoMaximo - Maximum term
   */
  SELECT
    [vehConFin].[idVehicleCondicaoFinanciamento],
    [vehConFin].[entradaMinima],
    [vehConFin].[taxaJuros],
    [vehConFin].[prazoMaximo]
  FROM [functional].[vehicleCondicaoFinanciamento] [vehConFin]
  WHERE [vehConFin].[idVehicle] = @idVehicle;

  /**
   * @output {VehicleDocumentacao, n, n}
   * @column {INT} idVehicleDocumentacao - Documentation identifier
   * @column {NVARCHAR} nomeDocumento - Document name
   * @column {NVARCHAR} observacoes - Document observations
   */
  SELECT
    [vehDoc].[idVehicleDocumentacao],
    [vehDoc].[nomeDocumento],
    [vehDoc].[observacoes]
  FROM [functional].[vehicleDocumentacao] [vehDoc]
  WHERE [vehDoc].[idVehicle] = @idVehicle;

  /**
   * @output {VehicleSituacaoDocumental, 1, n}
   * @column {INT} idVehicleSituacaoDocumental - Document status identifier
   * @column {NVARCHAR} statusRegularizacao - Regularization status
   * @column {NVARCHAR} pendencias - Pending issues
   * @column {NVARCHAR} observacoes - Status observations
   */
  SELECT
    [vehSitDoc].[idVehicleSituacaoDocumental],
    [vehSitDoc].[statusRegularizacao],
    [vehSitDoc].[pendencias],
    [vehSitDoc].[observacoes]
  FROM [functional].[vehicleSituacaoDocumental] [vehSitDoc]
  WHERE [vehSitDoc].[idVehicle] = @idVehicle;
END;
GO