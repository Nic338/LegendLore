using LegendLore.Repositories;
using LegendLore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestController : ControllerBase
    {
        private readonly IQuestRepository _questRepository;

        public QuestController(IQuestRepository questRepository)
        {
            _questRepository = questRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_questRepository.GetAllQuests());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Quest quest = _questRepository.GetQuestById(id);
            if (quest == null)
            {
                return NotFound();
            }
            return Ok(quest);
        }

        [HttpPost]
        public IActionResult Post(Quest quest)
        {
            _questRepository.Add(quest);
            return CreatedAtAction("Get", new { id = quest.Id }, quest);
        }

        [HttpPut]
        public IActionResult Put(int id, Quest quest)
        {
            if (id != quest.Id)
            {
                return BadRequest();
            }
            _questRepository.Update(quest);
            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _questRepository.Delete(id);
            return NoContent();
        }
    }
}
