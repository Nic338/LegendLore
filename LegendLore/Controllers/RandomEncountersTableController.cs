using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;
using LegendLore.Repositories;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandomEncountersTableController : ControllerBase
    {
        private readonly IRandomEncountersTableRepository _randomEncountersTableRepository;

        public RandomEncountersTableController(IRandomEncountersTableRepository randomEncountersTableRepository)
        {
            _randomEncountersTableRepository = randomEncountersTableRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_randomEncountersTableRepository.GetAllRandomEncounterTables());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            RandomEncountersTable table = _randomEncountersTableRepository.GetRandomEncountersTableById(id);
            if (table == null)
            {
                return NotFound();
            }
            return Ok(table);
        }

        [HttpPost]
        public IActionResult Post(RandomEncountersTable table)
        {
            _randomEncountersTableRepository.Add(table);
            return CreatedAtAction("Get", new { id = table.Id }, table);
        }

        [HttpPut]
        public IActionResult Put(int id, RandomEncountersTable table)
        {
            if (id != table.Id)
            {
                return BadRequest();
            }
            _randomEncountersTableRepository.Update(table);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _randomEncountersTableRepository.Delete(id);
            return NoContent();
        }
    }
}
