/**
 * @load vehicle
 */
INSERT INTO [functional].[vehicle]
([modelo], [marca], [anoFabricacao], [anoModelo], [preco], [quilometragem], [combustivel], [cambio], [potencia], [cor], [portas], [carroceria], [motor], [finalPlaca], [statusVeiculo], [procedencia], [proprietarios], [garantia], [aceitaTroca], [observacoesVenda], [tituloAnuncio], [urlCompartilhamento], [textoCompartilhamento])
VALUES
('Civic', 'Honda', 2023, 2023, 145000.00, 5000, 'Flex', 'Automático', '155 cv', 'Prata', 4, 'Sedan', '2.0', 1, 'Disponível', 'Concessionária', 0, '3 anos ou 100.000 km', 1, 'Aceita veículo como parte do pagamento', 'Honda Civic 2023', '/veiculos/honda-civic-2023-1', 'Confira este Honda Civic 2023 por R$ 145.000,00'),
('Corolla', 'Toyota', 2022, 2022, 135000.00, 15000, 'Flex', 'CVT', '177 cv', 'Branco', 4, 'Sedan', '2.0', 2, 'Disponível', 'Particular', 1, 'Até 12/2024', 1, NULL, 'Toyota Corolla 2022', '/veiculos/toyota-corolla-2022-2', 'Confira este Toyota Corolla 2022 por R$ 135.000,00'),
('Onix', 'Chevrolet', 2023, 2023, 85000.00, 2000, 'Flex', 'Manual', '116 cv', 'Preto', 4, 'Hatch', '1.0', 3, 'Disponível', 'Concessionária', 0, '3 anos ou 100.000 km', 1, NULL, 'Chevrolet Onix 2023', '/veiculos/chevrolet-onix-2023-3', 'Confira este Chevrolet Onix 2023 por R$ 85.000,00'),
('HB20', 'Hyundai', 2021, 2021, 75000.00, 30000, 'Flex', 'Manual', '80 cv', 'Vermelho', 4, 'Hatch', '1.0', 4, 'Disponível', 'Particular', 2, NULL, 0, NULL, 'Hyundai HB20 2021', '/veiculos/hyundai-hb20-2021-4', 'Confira este Hyundai HB20 2021 por R$ 75.000,00'),
('Compass', 'Jeep', 2023, 2023, 185000.00, 8000, 'Flex', 'Automático', '185 cv', 'Azul', 4, 'SUV', '2.0', 5, 'Disponível', 'Concessionária', 0, '3 anos ou 100.000 km', 1, 'Aceita veículo como parte do pagamento', 'Jeep Compass 2023', '/veiculos/jeep-compass-2023-5', 'Confira este Jeep Compass 2023 por R$ 185.000,00');
GO

/**
 * @load vehiclePhoto
 */
INSERT INTO [functional].[vehiclePhoto]
([idVehicle], [fotoUrl], [legenda], [principal], [ordem])
VALUES
(1, 'https://example.com/civic-front.jpg', 'Vista frontal', 1, 1),
(1, 'https://example.com/civic-side.jpg', 'Vista lateral', 0, 2),
(1, 'https://example.com/civic-interior.jpg', 'Interior', 0, 3),
(2, 'https://example.com/corolla-front.jpg', 'Vista frontal', 1, 1),
(2, 'https://example.com/corolla-side.jpg', 'Vista lateral', 0, 2),
(3, 'https://example.com/onix-front.jpg', 'Vista frontal', 1, 1),
(3, 'https://example.com/onix-interior.jpg', 'Interior', 0, 2),
(4, 'https://example.com/hb20-front.jpg', 'Vista frontal', 1, 1),
(5, 'https://example.com/compass-front.jpg', 'Vista frontal', 1, 1),
(5, 'https://example.com/compass-side.jpg', 'Vista lateral', 0, 2),
(5, 'https://example.com/compass-interior.jpg', 'Interior', 0, 3);
GO

/**
 * @load vehicleItem
 */
INSERT INTO [functional].[vehicleItem]
([idVehicle], [descricao], [categoria], [serie])
VALUES
(1, 'Ar-condicionado digital', 'Conforto', 1),
(1, 'Bancos de couro', 'Conforto', 1),
(1, 'Freios ABS', 'Segurança', 1),
(1, 'Airbags frontais e laterais', 'Segurança', 1),
(1, 'Central multimídia', 'Tecnologia', 1),
(1, 'Sensor de estacionamento', 'Tecnologia', 0),
(2, 'Ar-condicionado automático', 'Conforto', 1),
(2, 'Freios ABS', 'Segurança', 1),
(2, 'Airbags', 'Segurança', 1),
(2, 'Central multimídia', 'Tecnologia', 1),
(3, 'Ar-condicionado', 'Conforto', 1),
(3, 'Direção elétrica', 'Conforto', 1),
(3, 'Freios ABS', 'Segurança', 1),
(4, 'Ar-condicionado', 'Conforto', 1),
(4, 'Direção hidráulica', 'Conforto', 1),
(5, 'Ar-condicionado digital', 'Conforto', 1),
(5, 'Bancos de couro', 'Conforto', 1),
(5, 'Tração 4x4', 'Performance', 1),
(5, 'Freios ABS', 'Segurança', 1),
(5, 'Airbags', 'Segurança', 1),
(5, 'Central multimídia', 'Tecnologia', 1);
GO

/**
 * @load vehicleRevisao
 */
INSERT INTO [functional].[vehicleRevisao]
([idVehicle], [dataRevisao], [quilometragem], [local])
VALUES
(1, '2023-06-15', 5000, 'Concessionária Honda'),
(2, '2022-08-20', 10000, 'Concessionária Toyota'),
(2, '2023-02-10', 15000, 'Oficina autorizada'),
(4, '2021-12-05', 10000, 'Concessionária Hyundai'),
(4, '2022-06-15', 20000, 'Concessionária Hyundai'),
(5, '2023-04-10', 5000, 'Concessionária Jeep');
GO

/**
 * @load vehicleLaudoTecnico
 */
INSERT INTO [functional].[vehicleLaudoTecnico]
([idVehicle], [dataInspecao], [resultadoGeral])
VALUES
(1, '2023-11-01', 'Aprovado - Veículo em excelente estado'),
(2, '2023-10-15', 'Aprovado - Pequenos desgastes normais de uso'),
(5, '2023-11-05', 'Aprovado - Veículo em ótimo estado');
GO

/**
 * @load vehicleFormaPagamento
 */
INSERT INTO [functional].[vehicleFormaPagamento]
([idVehicle], [formaPagamento])
VALUES
(1, 'À vista'),
(1, 'Financiamento'),
(2, 'À vista'),
(2, 'Financiamento'),
(3, 'À vista'),
(3, 'Financiamento'),
(4, 'À vista'),
(5, 'À vista'),
(5, 'Financiamento'),
(5, 'Consórcio');
GO

/**
 * @load vehicleCondicaoFinanciamento
 */
INSERT INTO [functional].[vehicleCondicaoFinanciamento]
([idVehicle], [entradaMinima], [taxaJuros], [prazoMaximo])
VALUES
(1, 29000.00, 1.99, 60),
(2, 27000.00, 1.89, 48),
(3, 17000.00, 2.19, 48),
(5, 37000.00, 1.99, 60);
GO

/**
 * @load vehicleDocumentacao
 */
INSERT INTO [functional].[vehicleDocumentacao]
([idVehicle], [nomeDocumento], [observacoes])
VALUES
(1, 'RG e CPF', 'Documentos originais'),
(1, 'Comprovante de residência', 'Atualizado (últimos 3 meses)'),
(1, 'Comprovante de renda', 'Para financiamento'),
(2, 'RG e CPF', 'Documentos originais'),
(2, 'Comprovante de residência', 'Atualizado (últimos 3 meses)'),
(3, 'RG e CPF', 'Documentos originais'),
(3, 'Comprovante de residência', 'Atualizado (últimos 3 meses)'),
(4, 'RG e CPF', 'Documentos originais'),
(4, 'Comprovante de residência', 'Atualizado (últimos 3 meses)'),
(5, 'RG e CPF', 'Documentos originais'),
(5, 'Comprovante de residência', 'Atualizado (últimos 3 meses)'),
(5, 'Comprovante de renda', 'Para financiamento');
GO

/**
 * @load vehicleSituacaoDocumental
 */
INSERT INTO [functional].[vehicleSituacaoDocumental]
([idVehicle], [statusRegularizacao], [pendencias], [observacoes])
VALUES
(1, 'Regular', NULL, 'Toda documentação em dia'),
(2, 'Regular', NULL, 'Toda documentação em dia'),
(3, 'Regular', NULL, 'Toda documentação em dia'),
(4, 'Pendente', 'IPVA 2023', 'Pendência será regularizada antes da venda'),
(5, 'Regular', NULL, 'Toda documentação em dia');
GO