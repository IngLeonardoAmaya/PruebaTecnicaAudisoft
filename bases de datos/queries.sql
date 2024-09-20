CREATE DATABASE PruebaTecnicaAudisoft;
GO

USE PruebaTecnicaAudisoft;
GO

CREATE TABLE Estudiante (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Profesor (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Nota (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    IdProfesor INT NOT NULL,
    IdEstudiante INT NOT NULL,
    Valor DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (IdProfesor) REFERENCES Profesor(Id),
    FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(Id)
);

GO

select * from Estudiante
select * from Profesor
select * from Nota