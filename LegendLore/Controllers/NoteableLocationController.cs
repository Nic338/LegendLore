using LegendLore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteableLocationController : ControllerBase
    {
        private readonly INoteableLocationRepository _noteableLocationRepository;

        public NoteableLocationController(INoteableLocationRepository noteableLocationRepository)
        {
            _noteableLocationRepository = noteableLocationRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_noteableLocationRepository.GetAllNoteableLocations());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            NoteableLocation noteableLocation = _noteableLocationRepository.GetNoteableLocationById(id);
            if (noteableLocation == null)
            {
                return NotFound();
            }
            return Ok(noteableLocation);
        }

        [HttpPost]
        public IActionResult Post(NoteableLocation noteableLocation)
        {
            _noteableLocationRepository.Add(noteableLocation);
            return CreatedAtAction("Get", new { id = noteableLocation.Id }, noteableLocation);
        }

        [HttpPut]
        public IActionResult Put(int id, NoteableLocation noteableLocation)
        {
            if (id != noteableLocation.Id)
            {
                return BadRequest();
            }
            _noteableLocationRepository.Update(noteableLocation);
            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _noteableLocationRepository.Delete(id);
            return NoContent();
        }
    }
}
