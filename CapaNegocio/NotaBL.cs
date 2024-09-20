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
    public class NotaBL
    {
        private readonly NotaDAL _notaDAL;
        public string msjError;

        public NotaBL()
        {
            _notaDAL = new NotaDAL();
        }

        public async Task<List<Notas>> Listar()
        {
            List<Notas> lista = new List<Notas>();
            try
            {
                DataTable dt = await _notaDAL.Listar();
                foreach (DataRow row in dt.Rows)
                {
                    lista.Add(new Notas
                    {
                        Id = Convert.ToInt32(row["Id"]),
                        Nombre = Convert.ToString(row["Nombre"]),
                        IdProfesor = Convert.ToInt32(row["IdProfesor"]),
                        IdEstudiante = Convert.ToInt32(row["IdEstudiante"]),
                        Valor = Convert.ToDecimal(row["Valor"])
                    });
                }
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
            }
            return lista;
        }

        public async Task<bool> Insertar(Notas nota)
        {
            try
            {
                DataTable dt = await _notaDAL.Insertar(nota.Nombre, nota.IdProfesor, nota.IdEstudiante, nota.Valor);
                return dt.Rows[0]["Respuesta"].ToString() == "OK";
            }
            catch (Exception ex)
            {
                msjError = ex.Message;
                return false;
            }
        }

        public async Task<bool> Actualizar(Notas nota)
        {
            try
            {
                DataTable dt = await _notaDAL.Actualizar(nota.Id, nota.Nombre, nota.IdProfesor, nota.IdEstudiante, nota.Valor);
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
                DataTable dt = await _notaDAL.Eliminar(id);
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
