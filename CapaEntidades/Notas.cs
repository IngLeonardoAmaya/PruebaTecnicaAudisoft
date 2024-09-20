using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidades
{
    public class Notas
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdProfesor { get; set; }
        public int IdEstudiante { get; set; }
        public decimal Valor { get; set; }
    }
}
