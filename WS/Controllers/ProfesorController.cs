using CapaDatos;
using CapaEntidades;
using CapaNegocio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly ProfesorBL _profesorBL;

        public ProfesorController(ProfesorBL profesorBL)
        {
            _profesorBL = profesorBL;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesor>>> Get()
        {
            var profesores = await _profesorBL.Listar();
            if (!string.IsNullOrEmpty(_profesorBL.msjError))
            {
                return BadRequest(_profesorBL.msjError);
            }
            return Ok(profesores);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] Profesor profesor)
        {
            var result = await _profesorBL.Insertar(profesor);
            if (!string.IsNullOrEmpty(_profesorBL.msjError))
            {
                return BadRequest(_profesorBL.msjError);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] Profesor profesor)
        {
            if (id != profesor.Id)
            {
                return BadRequest("El ID no coincide");
            }
            var result = await _profesorBL.Actualizar(profesor);
            if (!string.IsNullOrEmpty(_profesorBL.msjError))
            {
                return BadRequest(_profesorBL.msjError);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _profesorBL.Eliminar(id);
            if (!string.IsNullOrEmpty(_profesorBL.msjError))
            {
                return BadRequest(_profesorBL.msjError);
            }
            return Ok(result);
        }
    }
}
