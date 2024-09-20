using CapaDatos;
using CapaEntidades;
using CapaNegocio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly NotaBL _notaBL;

        public NotasController(NotaBL notaBL)
        {
            _notaBL = notaBL;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notas>>> Get()
        {
            var notas = await _notaBL.Listar();
            if (!string.IsNullOrEmpty(_notaBL.msjError))
            {
                return BadRequest(_notaBL.msjError);
            }
            return Ok(notas);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] Notas nota)
        {
            var result = await _notaBL.Insertar(nota);
            if (!string.IsNullOrEmpty(_notaBL.msjError))
            {
                return BadRequest(_notaBL.msjError);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] Notas nota)
        {
            if (id != nota.Id)
            {
                return BadRequest("El ID no coincide");
            }
            var result = await _notaBL.Actualizar(nota);
            if (!string.IsNullOrEmpty(_notaBL.msjError))
            {
                return BadRequest(_notaBL.msjError);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _notaBL.Eliminar(id);
            if (!string.IsNullOrEmpty(_notaBL.msjError))
            {
                return BadRequest(_notaBL.msjError);
            }
            return Ok(result);
        }
    }
}
