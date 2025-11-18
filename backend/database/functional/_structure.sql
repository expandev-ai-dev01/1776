/**
 * @schema functional
 * Business entity schema for vehicle catalog
 */
CREATE SCHEMA [functional];
GO

/**
 * @table vehicle Vehicle catalog information
 * @multitenancy false
 * @softDelete false
 * @alias veh
 */
CREATE TABLE [functional].[vehicle] (
  [idVehicle] INTEGER IDENTITY(1, 1) NOT NULL,
  [modelo] NVARCHAR(100) NOT NULL,
  [marca] NVARCHAR(100) NOT NULL,
  [anoFabricacao] INTEGER NOT NULL,
  [anoModelo] INTEGER NOT NULL,
  [preco] NUMERIC(18, 6) NOT NULL,
  [quilometragem] INTEGER NOT NULL,
  [combustivel] NVARCHAR(50) NOT NULL,
  [cambio] NVARCHAR(50) NOT NULL,
  [potencia] NVARCHAR(50) NOT NULL,
  [cor] NVARCHAR(50) NOT NULL,
  [portas] INTEGER NOT NULL,
  [carroceria] NVARCHAR(50) NOT NULL,
  [motor] NVARCHAR(50) NOT NULL,
  [finalPlaca] INTEGER NOT NULL,
  [statusVeiculo] NVARCHAR(50) NOT NULL,
  [procedencia] NVARCHAR(50) NOT NULL,
  [proprietarios] INTEGER NOT NULL,
  [garantia] NVARCHAR(200) NULL,
  [aceitaTroca] BIT NOT NULL,
  [observacoesVenda] NVARCHAR(500) NULL,
  [tituloAnuncio] NVARCHAR(100) NOT NULL,
  [urlCompartilhamento] NVARCHAR(500) NOT NULL,
  [textoCompartilhamento] NVARCHAR(500) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @table vehiclePhoto Vehicle photo gallery
 * @multitenancy false
 * @softDelete false
 * @alias vehPht
 */
CREATE TABLE [functional].[vehiclePhoto] (
  [idVehiclePhoto] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [fotoUrl] NVARCHAR(500) NOT NULL,
  [legenda] NVARCHAR(50) NULL,
  [principal] BIT NOT NULL DEFAULT (0),
  [ordem] INTEGER NOT NULL
);
GO

/**
 * @table vehicleItem Vehicle items and optionals
 * @multitenancy false
 * @softDelete false
 * @alias vehItm
 */
CREATE TABLE [functional].[vehicleItem] (
  [idVehicleItem] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [descricao] NVARCHAR(200) NOT NULL,
  [categoria] NVARCHAR(50) NOT NULL,
  [serie] BIT NOT NULL
);
GO

/**
 * @table vehicleRevisao Vehicle maintenance history
 * @multitenancy false
 * @softDelete false
 * @alias vehRev
 */
CREATE TABLE [functional].[vehicleRevisao] (
  [idVehicleRevisao] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [dataRevisao] DATE NOT NULL,
  [quilometragem] INTEGER NOT NULL,
  [local] NVARCHAR(200) NOT NULL
);
GO

/**
 * @table vehicleSinistro Vehicle accident history
 * @multitenancy false
 * @softDelete false
 * @alias vehSin
 */
CREATE TABLE [functional].[vehicleSinistro] (
  [idVehicleSinistro] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [dataSinistro] DATE NOT NULL,
  [tipo] NVARCHAR(100) NOT NULL,
  [descricao] NVARCHAR(500) NOT NULL
);
GO

/**
 * @table vehicleLaudoTecnico Vehicle technical inspection report
 * @multitenancy false
 * @softDelete false
 * @alias vehLau
 */
CREATE TABLE [functional].[vehicleLaudoTecnico] (
  [idVehicleLaudoTecnico] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [dataInspecao] DATE NOT NULL,
  [resultadoGeral] NVARCHAR(200) NOT NULL
);
GO

/**
 * @table vehicleFormaPagamento Vehicle payment methods
 * @multitenancy false
 * @softDelete false
 * @alias vehFrmPag
 */
CREATE TABLE [functional].[vehicleFormaPagamento] (
  [idVehicleFormaPagamento] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [formaPagamento] NVARCHAR(50) NOT NULL
);
GO

/**
 * @table vehicleCondicaoFinanciamento Vehicle financing conditions
 * @multitenancy false
 * @softDelete false
 * @alias vehConFin
 */
CREATE TABLE [functional].[vehicleCondicaoFinanciamento] (
  [idVehicleCondicaoFinanciamento] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [entradaMinima] NUMERIC(18, 6) NOT NULL,
  [taxaJuros] NUMERIC(8, 4) NOT NULL,
  [prazoMaximo] INTEGER NOT NULL
);
GO

/**
 * @table vehicleDocumentacao Vehicle required documentation
 * @multitenancy false
 * @softDelete false
 * @alias vehDoc
 */
CREATE TABLE [functional].[vehicleDocumentacao] (
  [idVehicleDocumentacao] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [nomeDocumento] NVARCHAR(200) NOT NULL,
  [observacoes] NVARCHAR(500) NULL
);
GO

/**
 * @table vehicleSituacaoDocumental Vehicle document status
 * @multitenancy false
 * @softDelete false
 * @alias vehSitDoc
 */
CREATE TABLE [functional].[vehicleSituacaoDocumental] (
  [idVehicleSituacaoDocumental] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [statusRegularizacao] NVARCHAR(50) NOT NULL,
  [pendencias] NVARCHAR(500) NULL,
  [observacoes] NVARCHAR(500) NULL
);
GO

/**
 * @table contactForm Contact form submissions
 * @multitenancy false
 * @softDelete false
 * @alias cntFrm
 */
CREATE TABLE [functional].[contactForm] (
  [idContactForm] INTEGER IDENTITY(1, 1) NOT NULL,
  [idVehicle] INTEGER NOT NULL,
  [nomeCompleto] NVARCHAR(100) NOT NULL,
  [email] NVARCHAR(100) NOT NULL,
  [telefone] NVARCHAR(20) NOT NULL,
  [preferenciaContato] NVARCHAR(20) NOT NULL,
  [melhorHorario] NVARCHAR(20) NOT NULL,
  [assunto] NVARCHAR(50) NOT NULL,
  [mensagem] NVARCHAR(1000) NOT NULL,
  [financiamento] BIT NOT NULL DEFAULT (0),
  [receberNovidades] BIT NOT NULL DEFAULT (0),
  [ipUsuario] NVARCHAR(50) NOT NULL,
  [protocolo] NVARCHAR(20) NOT NULL,
  [status] NVARCHAR(20) NOT NULL DEFAULT ('Novo'),
  [consultorResponsavel] INTEGER NULL,
  [notasAtendimento] NVARCHAR(MAX) NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkVehicle
 * @keyType Object
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [pkVehicle] PRIMARY KEY CLUSTERED ([idVehicle]);
GO

/**
 * @primaryKey pkVehiclePhoto
 * @keyType Object
 */
ALTER TABLE [functional].[vehiclePhoto]
ADD CONSTRAINT [pkVehiclePhoto] PRIMARY KEY CLUSTERED ([idVehiclePhoto]);
GO

/**
 * @primaryKey pkVehicleItem
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleItem]
ADD CONSTRAINT [pkVehicleItem] PRIMARY KEY CLUSTERED ([idVehicleItem]);
GO

/**
 * @primaryKey pkVehicleRevisao
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleRevisao]
ADD CONSTRAINT [pkVehicleRevisao] PRIMARY KEY CLUSTERED ([idVehicleRevisao]);
GO

/**
 * @primaryKey pkVehicleSinistro
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleSinistro]
ADD CONSTRAINT [pkVehicleSinistro] PRIMARY KEY CLUSTERED ([idVehicleSinistro]);
GO

/**
 * @primaryKey pkVehicleLaudoTecnico
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleLaudoTecnico]
ADD CONSTRAINT [pkVehicleLaudoTecnico] PRIMARY KEY CLUSTERED ([idVehicleLaudoTecnico]);
GO

/**
 * @primaryKey pkVehicleFormaPagamento
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleFormaPagamento]
ADD CONSTRAINT [pkVehicleFormaPagamento] PRIMARY KEY CLUSTERED ([idVehicleFormaPagamento]);
GO

/**
 * @primaryKey pkVehicleCondicaoFinanciamento
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleCondicaoFinanciamento]
ADD CONSTRAINT [pkVehicleCondicaoFinanciamento] PRIMARY KEY CLUSTERED ([idVehicleCondicaoFinanciamento]);
GO

/**
 * @primaryKey pkVehicleDocumentacao
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleDocumentacao]
ADD CONSTRAINT [pkVehicleDocumentacao] PRIMARY KEY CLUSTERED ([idVehicleDocumentacao]);
GO

/**
 * @primaryKey pkVehicleSituacaoDocumental
 * @keyType Object
 */
ALTER TABLE [functional].[vehicleSituacaoDocumental]
ADD CONSTRAINT [pkVehicleSituacaoDocumental] PRIMARY KEY CLUSTERED ([idVehicleSituacaoDocumental]);
GO

/**
 * @primaryKey pkContactForm
 * @keyType Object
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [pkContactForm] PRIMARY KEY CLUSTERED ([idContactForm]);
GO

/**
 * @foreignKey fkVehiclePhoto_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehiclePhoto]
ADD CONSTRAINT [fkVehiclePhoto_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleItem_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleItem]
ADD CONSTRAINT [fkVehicleItem_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleRevisao_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleRevisao]
ADD CONSTRAINT [fkVehicleRevisao_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleSinistro_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleSinistro]
ADD CONSTRAINT [fkVehicleSinistro_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleLaudoTecnico_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleLaudoTecnico]
ADD CONSTRAINT [fkVehicleLaudoTecnico_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleFormaPagamento_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleFormaPagamento]
ADD CONSTRAINT [fkVehicleFormaPagamento_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleCondicaoFinanciamento_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleCondicaoFinanciamento]
ADD CONSTRAINT [fkVehicleCondicaoFinanciamento_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleDocumentacao_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleDocumentacao]
ADD CONSTRAINT [fkVehicleDocumentacao_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkVehicleSituacaoDocumental_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[vehicleSituacaoDocumental]
ADD CONSTRAINT [fkVehicleSituacaoDocumental_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @foreignKey fkContactForm_Vehicle
 * @target functional.vehicle
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [fkContactForm_Vehicle] FOREIGN KEY ([idVehicle])
REFERENCES [functional].[vehicle]([idVehicle]);
GO

/**
 * @check chkVehicle_StatusVeiculo
 * @enum {Disponível} Vehicle is available for sale
 * @enum {Reservado} Vehicle is reserved
 * @enum {Vendido} Vehicle is sold
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_StatusVeiculo] CHECK ([statusVeiculo] IN ('Disponível', 'Reservado', 'Vendido'));
GO

/**
 * @check chkVehicle_Combustivel
 * @enum {Gasolina} Gasoline
 * @enum {Etanol} Ethanol
 * @enum {Flex} Flex fuel
 * @enum {Diesel} Diesel
 * @enum {Elétrico} Electric
 * @enum {Híbrido} Hybrid
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Combustivel] CHECK ([combustivel] IN ('Gasolina', 'Etanol', 'Flex', 'Diesel', 'Elétrico', 'Híbrido'));
GO

/**
 * @check chkVehicle_Cambio
 * @enum {Manual} Manual transmission
 * @enum {Automático} Automatic transmission
 * @enum {CVT} CVT transmission
 * @enum {Semi-automático} Semi-automatic transmission
 * @enum {Automatizado} Automated transmission
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Cambio] CHECK ([cambio] IN ('Manual', 'Automático', 'CVT', 'Semi-automático', 'Automatizado'));
GO

/**
 * @check chkVehicle_Carroceria
 * @enum {Hatch} Hatchback
 * @enum {Sedan} Sedan
 * @enum {SUV} SUV
 * @enum {Picape} Pickup truck
 * @enum {Minivan} Minivan
 * @enum {Conversível} Convertible
 * @enum {Cupê} Coupe
 * @enum {Wagon} Wagon
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Carroceria] CHECK ([carroceria] IN ('Hatch', 'Sedan', 'SUV', 'Picape', 'Minivan', 'Conversível', 'Cupê', 'Wagon'));
GO

/**
 * @check chkVehicle_Procedencia
 * @enum {Particular} Private owner
 * @enum {Concessionária} Dealership
 * @enum {Leilão} Auction
 * @enum {Importado} Imported
 * @enum {Locadora} Rental company
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Procedencia] CHECK ([procedencia] IN ('Particular', 'Concessionária', 'Leilão', 'Importado', 'Locadora'));
GO

/**
 * @check chkVehicle_Portas
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_Portas] CHECK ([portas] BETWEEN 2 AND 5);
GO

/**
 * @check chkVehicle_FinalPlaca
 */
ALTER TABLE [functional].[vehicle]
ADD CONSTRAINT [chkVehicle_FinalPlaca] CHECK ([finalPlaca] BETWEEN 0 AND 9);
GO

/**
 * @check chkVehicleItem_Categoria
 * @enum {Conforto} Comfort items
 * @enum {Segurança} Safety items
 * @enum {Tecnologia} Technology items
 * @enum {Performance} Performance items
 * @enum {Estética} Aesthetic items
 */
ALTER TABLE [functional].[vehicleItem]
ADD CONSTRAINT [chkVehicleItem_Categoria] CHECK ([categoria] IN ('Conforto', 'Segurança', 'Tecnologia', 'Performance', 'Estética'));
GO

/**
 * @check chkVehicleSituacaoDocumental_Status
 * @enum {Regular} Regular status
 * @enum {Pendente} Pending status
 * @enum {Em andamento} In progress status
 */
ALTER TABLE [functional].[vehicleSituacaoDocumental]
ADD CONSTRAINT [chkVehicleSituacaoDocumental_Status] CHECK ([statusRegularizacao] IN ('Regular', 'Pendente', 'Em andamento'));
GO

/**
 * @check chkContactForm_PreferenciaContato
 * @enum {Telefone} Phone contact
 * @enum {E-mail} Email contact
 * @enum {WhatsApp} WhatsApp contact
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [chkContactForm_PreferenciaContato] CHECK ([preferenciaContato] IN ('Telefone', 'E-mail', 'WhatsApp'));
GO

/**
 * @check chkContactForm_MelhorHorario
 * @enum {Manhã} Morning
 * @enum {Tarde} Afternoon
 * @enum {Noite} Evening
 * @enum {Qualquer horário} Any time
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [chkContactForm_MelhorHorario] CHECK ([melhorHorario] IN ('Manhã', 'Tarde', 'Noite', 'Qualquer horário'));
GO

/**
 * @check chkContactForm_Assunto
 * @enum {Informações gerais} General information
 * @enum {Agendamento de test drive} Test drive scheduling
 * @enum {Negociação de preço} Price negotiation
 * @enum {Financiamento} Financing
 * @enum {Outro} Other
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [chkContactForm_Assunto] CHECK ([assunto] IN ('Informações gerais', 'Agendamento de test drive', 'Negociação de preço', 'Financiamento', 'Outro'));
GO

/**
 * @check chkContactForm_Status
 * @enum {Novo} New contact
 * @enum {Em atendimento} In progress
 * @enum {Concluído} Completed
 * @enum {Cancelado} Cancelled
 */
ALTER TABLE [functional].[contactForm]
ADD CONSTRAINT [chkContactForm_Status] CHECK ([status] IN ('Novo', 'Em atendimento', 'Concluído', 'Cancelado'));
GO

/**
 * @index ixVehicle_Marca
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Marca]
ON [functional].[vehicle]([marca]);
GO

/**
 * @index ixVehicle_Modelo
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Modelo]
ON [functional].[vehicle]([modelo]);
GO

/**
 * @index ixVehicle_Status
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixVehicle_Status]
ON [functional].[vehicle]([statusVeiculo]);
GO

/**
 * @index ixVehiclePhoto_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehiclePhoto_Vehicle]
ON [functional].[vehiclePhoto]([idVehicle]);
GO

/**
 * @index ixVehicleItem_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleItem_Vehicle]
ON [functional].[vehicleItem]([idVehicle]);
GO

/**
 * @index ixVehicleRevisao_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleRevisao_Vehicle]
ON [functional].[vehicleRevisao]([idVehicle]);
GO

/**
 * @index ixVehicleSinistro_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleSinistro_Vehicle]
ON [functional].[vehicleSinistro]([idVehicle]);
GO

/**
 * @index ixVehicleLaudoTecnico_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleLaudoTecnico_Vehicle]
ON [functional].[vehicleLaudoTecnico]([idVehicle]);
GO

/**
 * @index ixVehicleFormaPagamento_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleFormaPagamento_Vehicle]
ON [functional].[vehicleFormaPagamento]([idVehicle]);
GO

/**
 * @index ixVehicleCondicaoFinanciamento_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleCondicaoFinanciamento_Vehicle]
ON [functional].[vehicleCondicaoFinanciamento]([idVehicle]);
GO

/**
 * @index ixVehicleDocumentacao_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleDocumentacao_Vehicle]
ON [functional].[vehicleDocumentacao]([idVehicle]);
GO

/**
 * @index ixVehicleSituacaoDocumental_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixVehicleSituacaoDocumental_Vehicle]
ON [functional].[vehicleSituacaoDocumental]([idVehicle]);
GO

/**
 * @index ixContactForm_Vehicle
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixContactForm_Vehicle]
ON [functional].[contactForm]([idVehicle]);
GO

/**
 * @index ixContactForm_Status
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixContactForm_Status]
ON [functional].[contactForm]([status]);
GO

/**
 * @index ixContactForm_DateCreated
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixContactForm_DateCreated]
ON [functional].[contactForm]([dateCreated] DESC);
GO

/**
 * @index uqContactForm_Protocolo
 * @type Unique
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqContactForm_Protocolo]
ON [functional].[contactForm]([protocolo]);
GO