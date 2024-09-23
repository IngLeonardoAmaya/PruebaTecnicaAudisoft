using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class ProfesorDAL : Conexion
    {
        public async Task<DataTable> Listar()
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 100);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDProfesor");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar listar profesores");
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
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 150);
                this.adicionarParametro("Id", id);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDProfesor");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar obtener profesor por ID");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }


        public async Task<DataTable> Insertar(string nombre)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 200);
                this.adicionarParametro("Nombre", nombre);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDProfesor");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar insertar profesor");
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
                DataSet ds = await ejecutarProcedimiento("SP_CRUDProfesor");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar actualizar profesor");
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
                DataSet ds = await ejecutarProcedimiento("SP_CRUDProfesor");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar eliminar profesor");
                dtDatos = ds.Tables[0];

                // Verificar si la operación fue exitosa
                if (dtDatos.Rows.Count > 0 && dtDatos.Columns.Contains("Respuesta"))
                {
                    string respuesta = dtDatos.Rows[0]["Respuesta"].ToString();
                    if (respuesta != "OK")
                    {
                        throw new Exception(respuesta);
                    }
                }
                else
                {
                    throw new Exception("Respuesta inesperada del procedimiento almacenado");
                }
            }
            catch (SqlException ex) when (ex.Number == 547) // 547 es el código de error para violación de restricción de clave foránea
            {
                msjError = "No se puede eliminar el profesor porque tiene notas asociadas";
                throw new Exception(msjError);
            }
            catch (Exception ex)
            {
                // Capturar cualquier excepción y establecer el mensaje de error
                if (ex.Message.Contains("REFERENCE constraint"))
                {
                    msjError = "No se puede eliminar el profesor porque tiene notas asociadas";
                }
                else
                {
                    msjError = "Error al eliminar el profesor: " + ex.Message;
                }

                // Lanzar una nueva excepción con el mensaje de error
                throw new Exception(msjError);
            }
            return dtDatos;
        }
    }
}
