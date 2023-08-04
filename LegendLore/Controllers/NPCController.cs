using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NPCController : ControllerBase
    {
        private readonly INPCRepository _NPCRepository;

        public NPCController(INPCRepository NPCRepository)
        {
            _NPCRepository = NPCRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_NPCRepository.GetAllNPCs());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            NPC singleNPC = _NPCRepository.GetNPCbyId(id);
            if (singleNPC == null)
            {
                return NotFound();
            }
            return Ok(singleNPC);
        }

        [HttpPost]
        public IActionResult Post(NPC singleNPC)
        {
            _NPCRepository.Add(singleNPC);
            return CreatedAtAction("Get", new { id = singleNPC.Id }, singleNPC);
        }

        [HttpPut]
        public IActionResult Put(int id, NPC singleNPC)
        {
            if (id != singleNPC.Id)
            {
                return BadRequest();
            }
            _NPCRepository.Update(singleNPC);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _NPCRepository.Delete(id);
            return NoContent();
        }
    }
}
