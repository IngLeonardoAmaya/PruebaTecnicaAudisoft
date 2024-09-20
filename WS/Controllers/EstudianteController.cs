using CapaDatos;
using CapaEntidades;
using CapaNegocio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteBL _estudianteBL;

        public EstudianteController(EstudianteBL estudianteBL)
        {
            _estudianteBL = estudianteBL;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> Get()
        {
            var estudiantes = await _estudianteBL.Listar();
            if (!string.IsNullOrEmpty(_estudianteBL.msjError))
            {
                return BadRequest(_estudianteBL.msjError);
            }
            return Ok(estudiantes);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] Estudiante estudiante)
        {
            var result = await _estudianteBL.Insertar(estudiante);
            if (!string.IsNullOrEmpty(_estudianteBL.msjError))
            {
                return BadRequest(_estudianteBL.msjError);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] Estudiante estudiante)
        {
            if (id != estudiante.Id)
            {
                return BadRequest("El ID no coincide");
            }
            var result = await _estudianteBL.Actualizar(estudiante);
            if (!string.IsNullOrEmpty(_estudianteBL.msjError))
            {
                return BadRequest(_estudianteBL.msjError);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _estudianteBL.Eliminar(id);
            if (!string.IsNullOrEmpty(_estudianteBL.msjError))
            {
                return BadRequest(_estudianteBL.msjError);
            }
            return Ok(result);
        }
    }
}
