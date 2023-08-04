using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POIRandEncounterTablesController : ControllerBase
    {
        private readonly IPOIRandEncounterTablesRepository _poiRandEncounterTablesRepository;

        public POIRandEncounterTablesController(IPOIRandEncounterTablesRepository poiRandEncounterTablesRepository)
        {
            _poiRandEncounterTablesRepository = poiRandEncounterTablesRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_poiRandEncounterTablesRepository.GetPOIRandEncounterTables());
        }

        [HttpGet("GetPOIRandEncounterTablesByPOIId/{poiId}")]
        public IActionResult Get(int poiId)
        {
            List<POIRandEncounterTables> poiRandEncounterTables = _poiRandEncounterTablesRepository.GetPOIRandEncounterTablesByPOIId(poiId);
            if (poiRandEncounterTables == null)
            {
                return NotFound();
            }
            return Ok(poiRandEncounterTables);
        }

        [HttpPost]
        public IActionResult Put(int id, POIRandEncounterTables poiRandEncounterTable)
        {
            if (id != poiRandEncounterTable.Id)
            {
                return BadRequest();
            }
            _poiRandEncounterTablesRepository.Update(poiRandEncounterTable);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _poiRandEncounterTablesRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("{poiId")]
        public IActionResult DeleteFromPOI(int poiId)
        {
            _poiRandEncounterTablesRepository.DeleteFromPOI(poiId);
            return NoContent();
        }
    }
}
