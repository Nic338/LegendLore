using LegendLore.Repositories;
using LegendLore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class POIQuestsController : ControllerBase
    {
        private readonly IPOIQuestsRepository _poiQuestsRepository;

        public POIQuestsController(IPOIQuestsRepository poiQuestsRepository)
        {
            _poiQuestsRepository = poiQuestsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_poiQuestsRepository.GetPOIQuests());
        }

        [HttpGet("GetPOIQuestsByPOIId/{poiId}")]
        public IActionResult Get(int poiId)
        {
            List<POIQuests> poiQuests = _poiQuestsRepository.GetPOIQuestsByPOIId(poiId);
            if (poiQuests == null)
            {
                return NotFound();
            }
            return Ok(poiQuests);
        }

        [HttpPost]
        public IActionResult Post(POIQuests poiQuest)
        {
            _poiQuestsRepository.Add(poiQuest);
            return CreatedAtAction("Get", new { id = poiQuest.Id }, poiQuest);
        }

        [HttpPut]
        public IActionResult Put(int id, POIQuests pOIQuest)
        {
            if (id != pOIQuest.Id)
            {
                return BadRequest();
            }
            _poiQuestsRepository.Update(pOIQuest);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _poiQuestsRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("{poiId}")]
        public IActionResult DeleteFromPOI(int poiId)
        {
            _poiQuestsRepository.DeleteFromPOI(poiId);
            return NoContent();
        }
    }
}
