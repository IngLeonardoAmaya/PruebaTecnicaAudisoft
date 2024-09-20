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
    public class EstudianteBL
    {
        private readonly EstudianteDAL _estudianteDAL;
        public string msjError;

        public EstudianteBL()
        {
            _estudianteDAL = new EstudianteDAL();
        }

        public async Task<List<Estudiante>> Listar()
        {
            List<Estudiante> lista = new List<Estudiante>();
            try
            {
                DataTable dt = await _estudianteDAL.Listar();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Estudiante
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


        public async Task<Estudiante> ObtenerPorId(int id)
        {
            msjError = "";
            try
            {
                DataTable dt = await _estudianteDAL.ObtenerPorId(id);
                if (dt != null && dt.Rows.Count > 0)
                {
                    // Asumimos que la primera fila contiene los datos del estudiante
                    DataRow row = dt.Rows[0];
                    return new Estudiante
                    {
                        Id = Convert.ToInt32(row["Id"]),
                        Nombre = Convert.ToString(row["Nombre"])
                        // Agrega aquí otras propiedades según la estructura de tu tabla
                    };
                }
                else
                {
                    msjError = "No se encontró el estudiante";
                    return null;
                }
            }
            catch (Exception ex)
            {
                msjError = $"Error al obtener el estudiante: {ex.Message}";
                return null;
            }
        }


        public async Task<bool> Insertar(Estudiante estudiante)
        {
            try
            {
                DataTable dt = await _estudianteDAL.Insertar(estudiante.Nombre);
                return dt.Rows[0]["Respuesta"].ToString() == "OK";
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return false;
            }
        }

        public async Task<bool> Actualizar(Estudiante estudiante)
        {
            try
            {
                DataTable dt = await _estudianteDAL.Actualizar(estudiante.Id, estudiante.Nombre);
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
                DataTable dt = await _estudianteDAL.Eliminar(id);
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
