using LegendLore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotableLocationController : ControllerBase
    {
        private readonly INotableLocationRepository _notableLocationRepository;

        public NotableLocationController(INotableLocationRepository notableLocationRepository)
        {
            _notableLocationRepository = notableLocationRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_notableLocationRepository.GetAllNotableLocations());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            NotableLocation notableLocation = _notableLocationRepository.GetNotableLocationById(id);
            if (notableLocation == null)
            {
                return NotFound();
            }
            return Ok(notableLocation);
        }

        [HttpPost]
        public IActionResult Post(NotableLocation notableLocation)
        {
            _notableLocationRepository.Add(notableLocation);
            return CreatedAtAction("Get", new { id = notableLocation.Id }, notableLocation);
        }

        [HttpPut]
        public IActionResult Put(int id, NotableLocation notableLocation)
        {
            if (id != notableLocation.Id)
            {
                return BadRequest();
            }
            _notableLocationRepository.Update(notableLocation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _notableLocationRepository.Delete(id);
            return NoContent();
        }
    }
}
