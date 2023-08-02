using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapPOIsController : ControllerBase
    {
        private readonly IMapPOIsRepository _mapPOIsRepository;

        public MapPOIsController(IMapPOIsRepository mapPOIsRepository)
        {
            _mapPOIsRepository = mapPOIsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_mapPOIsRepository.GetAllMapPOIs());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            MapPOIs mapPOI = _mapPOIsRepository.GetById(id);
            if (mapPOI == null)
            {
                return NotFound();
            }
            return Ok(mapPOI);
        }

        [HttpPost]
        public IActionResult Post(MapPOIs mapPOI)
        {
            _mapPOIsRepository.Add(mapPOI);
            return CreatedAtAction("Get", new {id =  mapPOI.Id}, mapPOI);
        }

        [HttpPut]
        public IActionResult Put(int id,  MapPOIs mapPOI)
        {
            if (id != mapPOI.Id)
            {
                return BadRequest();
            }
            _mapPOIsRepository.Update(mapPOI);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _mapPOIsRepository.Delete(id);
            return NoContent();
        }
    }
}
