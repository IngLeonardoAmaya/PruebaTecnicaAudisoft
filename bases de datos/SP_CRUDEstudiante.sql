USE [PruebaTecnicaAudisoft]
GO
/****** Object:  StoredProcedure [dbo].[SP_CRUDEstudiante]    Script Date: 20/09/2024 8:13:43 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Leonardo Amaya
-- Create date: 20/09/2024
-- Description:	CRUD SP_CRUDEstudiante
-- =============================================
ALTER PROCEDURE [dbo].[SP_CRUDEstudiante] 
	-- Add the parameters for the stored procedure here
	@Opcion INT,
    @Id INT = 0,
    @Nombre VARCHAR(100) = ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	 BEGIN TRY
        IF @Opcion = 100 -- Listar
        BEGIN
           SELECT Id, Nombre 
		   FROM Estudiante
           SELECT 'OK' AS Respuesta
        END

		IF @Opcion = 150 -- Obtener por ID
        BEGIN
           SELECT Id, Nombre
           FROM Estudiante
           WHERE Id = @Id
           
           IF @@ROWCOUNT > 0
               SELECT 'OK' AS Respuesta
           ELSE
               SELECT 'Estudiante no encontrado' AS Respuesta
        END


        IF @Opcion = 200 -- Insertar
        BEGIN
            INSERT INTO Estudiante (Nombre) 
			VALUES (@Nombre)
            SELECT 'OK' AS Respuesta
        END
        IF @Opcion = 300 -- Actualizar
        BEGIN
            UPDATE Estudiante 
			SET Nombre = @Nombre 
			WHERE Id = @Id
            SELECT 'OK' AS Respuesta
        END
        IF @Opcion = 400 -- Eliminar
        BEGIN
            DELETE FROM Estudiante 
			WHERE Id = @Id
            SELECT 'OK' AS Respuesta
        END
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS Respuesta, ERROR_LINE() AS LineaError
    END CATCH
END
