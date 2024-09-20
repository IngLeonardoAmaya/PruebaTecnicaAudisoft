using CapaDatos;
using CapaEntidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class ProfesorBL
    {
        private readonly ProfesorDAL _profesorDAL;
        public string msjError;

        public ProfesorBL()
        {
            _profesorDAL = new ProfesorDAL();
        }

        public async Task<List<Profesor>> Listar()
        {
            List<Profesor> lista = new List<Profesor>();
            try
            {
                DataTable dt = await _profesorDAL.Listar();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Profesor
                    {
                        Id = Convert.ToInt32(row["Id"]),
                        Nombre = Convert.ToString(row["Nombre"])
                    });
                }
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return lista;
        }

        public async Task<Profesor> ObtenerPorId(int id)
        {
            try
            {
                DataTable dt = await _profesorDAL.ObtenerPorId(id);
                if (dt != null && dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];
                    return new Profesor
                    {
                        Id = Convert.ToInt32(row["Id"]),
                        Nombre = Convert.ToString(row["Nombre"])
                    };
                }
                else
                {
                    msjError = _profesorDAL.msjError ?? "Profesor no encontrado";
                    return null;
                }
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return null;
            }
        }


        public async Task<bool> Insertar(Profesor profesor)
        {
            try
            {
                DataTable dt = await _profesorDAL.Insertar(profesor.Nombre);
                return dt.Rows[0]["Respuesta"].ToString() == "OK";
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return false;
            }
        }

        public async Task<bool> Actualizar(Profesor profesor)
        {
            try
            {
                DataTable dt = await _profesorDAL.Actualizar(profesor.Id, profesor.Nombre);
                return dt.Rows[0]["Respuesta"].ToString() == "OK";
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return false;
            }
        }

        public async Task<bool> Eliminar(int id)
        {
            try
            {
                DataTable dt = await _profesorDAL.Eliminar(id);
                return dt.Rows[0]["Respuesta"].ToString() == "OK";
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return false;
            }
        }
    }
}
