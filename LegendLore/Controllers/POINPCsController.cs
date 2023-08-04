using LegendLore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POINPCsController : ControllerBase
    {
        private readonly IPOINPCsRepository _poiNPCsRepository;

        public POINPCsController(IPOINPCsRepository poiNPCsRepository)
        {
            _poiNPCsRepository = poiNPCsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_poiNPCsRepository.GetPOINPCs());
        }

        [HttpGet("GetPOINPCByPOIId/{poiId}")]
        public IActionResult Get(int poiId)
        {
            List<POINPCs> poiNPCs = _poiNPCsRepository.GetPOINPCsByPOIId(poiId);
            if (poiNPCs == null)
            {
                return NotFound();
            }
            return Ok(poiNPCs);
        }

        [HttpPost]
        public IActionResult Post(POINPCs poiNPC)
        {
            _poiNPCsRepository.Add(poiNPC);
            return CreatedAtAction("Get", new { id = poiNPC.Id }, poiNPC);
        }

        [HttpPut]
        public IActionResult Put(int id, POINPCs poiNPC)
        {
            if (id != poiNPC.Id)
            {
                return BadRequest();
            }
            _poiNPCsRepository.Update(poiNPC);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _poiNPCsRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("{poiId}")]
        public IActionResult DeleteFromPOI(int poiId)
        {
            _poiNPCsRepository.DeleteFromPOI(poiId);
            return NoContent();
        }
    }
}
