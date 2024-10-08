USE [PruebaTecnicaAudisoft]
GO
/****** Object:  StoredProcedure [dbo].[SP_CRUDNota]    Script Date: 20/09/2024 8:33:26 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Leonardo Amaya
-- Create date: 20/09/2024
-- Description:	CRUD SP_CRUDNota
-- =============================================
ALTER PROCEDURE [dbo].[SP_CRUDNota] 
	-- Add the parameters for the stored procedure here
	@Opcion INT,
    @Id INT = 0,
    @Nombre VARCHAR(100) = '',
    @IdProfesor INT = 0,
    @IdEstudiante INT = 0,
    @Valor DECIMAL(5,2) = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
        IF @Opcion = 100 -- Listar
        BEGIN
           SELECT Id, Nombre, IdProfesor, IdEstudiante, Valor 
		   FROM Nota
           SELECT 'OK' AS Respuesta
        END

		IF @Opcion = 150 -- Obtener por ID
        BEGIN
           SELECT Id, Nombre, IdProfesor, IdEstudiante, Valor
           FROM Nota
           WHERE Id = @Id
           
           IF @@ROWCOUNT > 0
               SELECT 'OK' AS Respuesta
           ELSE
               SELECT 'Nota no encontrada' AS Respuesta
        END

        IF @Opcion = 200 -- Insertar
        BEGIN
            INSERT INTO Nota (Nombre, IdProfesor, IdEstudiante, Valor) 
            VALUES (@Nombre, @IdProfesor, @IdEstudiante, @Valor)
            SELECT 'OK' AS Respuesta
        END
        IF @Opcion = 300 -- Actualizar
        BEGIN
            UPDATE Nota 
            SET Nombre = @Nombre, IdProfesor = @IdProfesor, 
                IdEstudiante = @IdEstudiante, Valor = @Valor 
            WHERE Id = @Id
            SELECT 'OK' AS Respuesta
        END
        IF @Opcion = 400 -- Eliminar
        BEGIN
            DELETE FROM Nota 
			WHERE Id = @Id
            SELECT 'OK' AS Respuesta
        END
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_MESSAGE() AS Respuesta,
            ERROR_LINE() AS LineaError,
            ERROR_NUMBER() AS NumeroError
    END CATCH
END
