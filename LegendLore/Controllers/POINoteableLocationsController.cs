using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POINoteableLocationsController : ControllerBase
    {
        private readonly IPOINoteableLocationsRepository _poiNoteableLocationsRepository;

        public POINoteableLocationsController(IPOINoteableLocationsRepository poiNoteableLocationsRepository)
        {
            _poiNoteableLocationsRepository = poiNoteableLocationsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_poiNoteableLocationsRepository.GetPOINoteableLocations());
        }

        [HttpGet("GetPOINoteableLocationsByPOIId/{poiId}")]
        public IActionResult Get(int poiId)
        {
            List<POINoteableLocations> poiNoteableLocations = _poiNoteableLocationsRepository.GetPOINoteableLocationsByPOIId(poiId);
            if (poiNoteableLocations == null)
            {
                return NotFound();
            }
            return Ok(poiNoteableLocations);
        }

        [HttpPost]
        public IActionResult Post(POINoteableLocations poiNoteableLocation)
        {
            _poiNoteableLocationsRepository.Add(poiNoteableLocation);
            return CreatedAtAction("Get", new { id = poiNoteableLocation.Id }, poiNoteableLocation);
        }

        [HttpPut]
        public IActionResult Put(int id, POINoteableLocations poiNoteableLocation)
        {
            if (id != poiNoteableLocation.Id)
            {
                return BadRequest();
            }
            _poiNoteableLocationsRepository.Update(poiNoteableLocation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _poiNoteableLocationsRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("{poiId}")]
        public IActionResult DeleteFromPOI(int poiId)
        {
            _poiNoteableLocationsRepository.DeleteFromPOI(poiId);
            return NoContent();
        }
    }
}
