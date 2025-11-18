/**
 * @summary
 * Creates a new contact form submission with automatic protocol generation
 * and vehicle validation
 *
 * @procedure spContactFormCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/external/contact-form
 *
 * @parameters
 * @param {INT} idVehicle
 *   - Required: Yes
 *   - Description: Vehicle identifier
 *
 * @param {NVARCHAR(100)} nomeCompleto
 *   - Required: Yes
 *   - Description: Full name of the contact
 *
 * @param {NVARCHAR(100)} email
 *   - Required: Yes
 *   - Description: Email address
 *
 * @param {NVARCHAR(20)} telefone
 *   - Required: Yes
 *   - Description: Phone number
 *
 * @param {NVARCHAR(20)} preferenciaContato
 *   - Required: Yes
 *   - Description: Contact preference (Telefone, E-mail, WhatsApp)
 *
 * @param {NVARCHAR(20)} melhorHorario
 *   - Required: Yes
 *   - Description: Best time to contact
 *
 * @param {NVARCHAR(50)} assunto
 *   - Required: Yes
 *   - Description: Subject of inquiry
 *
 * @param {NVARCHAR(1000)} mensagem
 *   - Required: Yes
 *   - Description: Message content
 *
 * @param {BIT} financiamento
 *   - Required: Yes
 *   - Description: Interest in financing
 *
 * @param {BIT} receberNovidades
 *   - Required: Yes
 *   - Description: Opt-in for newsletter
 *
 * @param {NVARCHAR(50)} ipUsuario
 *   - Required: Yes
 *   - Description: User IP address
 *
 * @returns {Object} Created contact form with protocol number
 *
 * @testScenarios
 * - Valid submission creates contact with protocol
 * - Invalid vehicle ID returns error
 * - Duplicate submission within 10 minutes blocked
 * - Protocol generation is unique
 */
CREATE OR ALTER PROCEDURE [functional].[spContactFormCreate]
  @idVehicle INTEGER,
  @nomeCompleto NVARCHAR(100),
  @email NVARCHAR(100),
  @telefone NVARCHAR(20),
  @preferenciaContato NVARCHAR(20),
  @melhorHorario NVARCHAR(20),
  @assunto NVARCHAR(50),
  @mensagem NVARCHAR(1000),
  @financiamento BIT,
  @receberNovidades BIT,
  @ipUsuario NVARCHAR(50)
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
   * @validation Check for duplicate submission from same IP within 10 minutes
   * @throw {duplicateSubmissionDetected}
   */
  IF EXISTS (
    SELECT * 
    FROM [functional].[contactForm] [cntFrm]
    WHERE [cntFrm].[ipUsuario] = @ipUsuario
      AND [cntFrm].[dateCreated] >= DATEADD(MINUTE, -10, GETUTCDATE())
  )
  BEGIN
    THROW 51000, 'duplicateSubmissionDetected', 1;
  END;

  DECLARE @protocolo NVARCHAR(20);
  DECLARE @dateCreated DATETIME2 = GETUTCDATE();

  /**
   * @rule {fn-contact-form-protocol} Generate unique protocol number
   * Format: YYYYMMDD + 5-digit sequential number
   */
  DECLARE @datePrefix NVARCHAR(8) = FORMAT(@dateCreated, 'yyyyMMdd');
  DECLARE @sequencial INTEGER;

  SELECT @sequencial = ISNULL(MAX(CAST(RIGHT([protocolo], 5) AS INTEGER)), 0) + 1
  FROM [functional].[contactForm]
  WHERE LEFT([protocolo], 8) = @datePrefix;

  SET @protocolo = @datePrefix + RIGHT('00000' + CAST(@sequencial AS NVARCHAR(5)), 5);

  BEGIN TRY
    /**
     * @rule {fn-contact-form-creation} Insert contact form submission
     */
    BEGIN TRAN;

      INSERT INTO [functional].[contactForm] (
        [idVehicle],
        [nomeCompleto],
        [email],
        [telefone],
        [preferenciaContato],
        [melhorHorario],
        [assunto],
        [mensagem],
        [financiamento],
        [receberNovidades],
        [ipUsuario],
        [protocolo],
        [status],
        [dateCreated],
        [dateModified]
      )
      VALUES (
        @idVehicle,
        @nomeCompleto,
        @email,
        @telefone,
        @preferenciaContato,
        @melhorHorario,
        @assunto,
        @mensagem,
        @financiamento,
        @receberNovidades,
        @ipUsuario,
        @protocolo,
        'Novo',
        @dateCreated,
        @dateCreated
      );

      DECLARE @idContactForm INTEGER = SCOPE_IDENTITY();

      /**
       * @output {ContactFormCreated, 1, n}
       * @column {INT} idContactForm - Contact form identifier
       * @column {NVARCHAR} protocolo - Protocol number
       * @column {NVARCHAR} status - Contact status
       * @column {DATETIME2} dateCreated - Creation timestamp
       */
      SELECT
        [cntFrm].[idContactForm],
        [cntFrm].[protocolo],
        [cntFrm].[status],
        [cntFrm].[dateCreated],
        [veh].[modelo],
        [veh].[marca],
        [veh].[anoModelo]
      FROM [functional].[contactForm] [cntFrm]
        JOIN [functional].[vehicle] [veh] ON ([veh].[idVehicle] = [cntFrm].[idVehicle])
      WHERE [cntFrm].[idContactForm] = @idContactForm;

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO