using LegendLore.Models;
using LegendLore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POIController : ControllerBase
    {
        private readonly IPOIRepository _POIRepository;

        public POIController(IPOIRepository POIRepository)
        {
            _POIRepository = POIRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_POIRepository.GetAllPOIs());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            POI singlePOI = _POIRepository.GetPOIById(id);
            if (singlePOI == null)
            {
                return NotFound();
            }
            return Ok(singlePOI);
        }

        [HttpPost]
        public IActionResult Post(POI singlePOI)
        {
            _POIRepository.Add(singlePOI);
            return CreatedAtAction("Get", new { id = singlePOI.Id }, singlePOI);
        }

        [HttpPut]
        public IActionResult Put(int id, POI singlePOI)
        {
            if (id != singlePOI.Id)
            {
                return BadRequest();
            }
            _POIRepository.Update(singlePOI);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _POIRepository.Delete(id);
            return NoContent();
        }
    }
}
