using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class EstudianteDAL : Conexion
    {
        public async Task<DataTable> Listar()
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 100);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDEstudiante");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar listar estudiantes");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }

        public async Task<DataTable> ObtenerPorId(int id)
        {
            DataTable dt = new DataTable();
            try
            {
                adicionarParametro("Opcion", 150); // Nuevo valor para obtener por ID
                adicionarParametro("Id", id);
                DataSet ds = await ejecutarProcedimiento("sp_CrudEstudiante");
                dt = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dt;
        }

        public async Task<DataTable> Insertar(string nombre)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 200);
                this.adicionarParametro("Nombre", nombre);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDEstudiante");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar insertar estudiante");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }

        public async Task<DataTable> Actualizar(int id, string nombre)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 300);
                this.adicionarParametro("Id", id);
                this.adicionarParametro("Nombre", nombre);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDEstudiante");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar actualizar estudiante");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }

        public async Task<DataTable> Eliminar(int id)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 400);
                this.adicionarParametro("Id", id);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDEstudiante");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar eliminar estudiante");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }
    }
}
