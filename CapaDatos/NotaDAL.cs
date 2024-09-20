using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class NotaDAL : Conexion
    {
        public async Task<DataTable> Listar()
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 100);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDNota");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar listar notas");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }

        public async Task<DataTable> Insertar(string nombre, int idProfesor, int idEstudiante, decimal valor)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 200);
                this.adicionarParametro("Nombre", nombre);
                this.adicionarParametro("IdProfesor", idProfesor);
                this.adicionarParametro("IdEstudiante", idEstudiante);
                this.adicionarParametro("Valor", valor);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDNota");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar insertar nota");
                dtDatos = ds.Tables[0];
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return dtDatos;
        }

        public async Task<DataTable> Actualizar(int id, string nombre, int idProfesor, int idEstudiante, decimal valor)
        {
            DataTable dtDatos = new DataTable();
            try
            {
                this.adicionarParametro("Opcion", 300);
                this.adicionarParametro("Id", id);
                this.adicionarParametro("Nombre", nombre);
                this.adicionarParametro("IdProfesor", idProfesor);
                this.adicionarParametro("IdEstudiante", idEstudiante);
                this.adicionarParametro("Valor", valor);
                DataSet ds = await ejecutarProcedimiento("SP_CRUDNota");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar actualizar nota");
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
                DataSet ds = await ejecutarProcedimiento("SP_CRUDNota");
                if (ds == null || ds.Tables.Count == 0)
                    throw new Exception("Error al ejecutar eliminar nota");
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
