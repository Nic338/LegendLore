using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POINotableLocationsController : ControllerBase
    {
        private readonly IPOINotableLocationsRepository _poiNotableLocationsRepository;

        public POINotableLocationsController(IPOINotableLocationsRepository poiNotableLocationsRepository)
        {
            _poiNotableLocationsRepository = poiNotableLocationsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_poiNotableLocationsRepository.GetPOINotableLocations());
        }

        [HttpGet("GetPOINotableLocationsByPOIId/{poiId}")]
        public IActionResult Get(int poiId)
        {
            List<POINotableLocations> poiNotableLocations = _poiNotableLocationsRepository.GetPOINotableLocationsByPOIId(poiId);
            if (poiNotableLocations == null)
            {
                return NotFound();
            }
            return Ok(poiNotableLocations);
        }

        [HttpPost]
        public IActionResult Post(POINotableLocations poiNotableLocation)
        {
            _poiNotableLocationsRepository.Add(poiNotableLocation);
            return CreatedAtAction("Get", new { id = poiNotableLocation.Id }, poiNotableLocation);
        }

        [HttpPut]
        public IActionResult Put(int id, POINotableLocations poiNotableLocation)
        {
            if (id != poiNotableLocation.Id)
            {
                return BadRequest();
            }
            _poiNotableLocationsRepository.Update(poiNotableLocation);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _poiNotableLocationsRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("{poiId}")]
        public IActionResult DeleteFromPOI(int poiId)
        {
            _poiNotableLocationsRepository.DeleteFromPOI(poiId);
            return NoContent();
        }
    }
}
