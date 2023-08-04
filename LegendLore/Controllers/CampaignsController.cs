using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Repositories;
using LegendLore.Models;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly ICampaignsRepository _campaignsRepository;

        public CampaignsController(ICampaignsRepository campaignsRepository)
        {
            _campaignsRepository = campaignsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_campaignsRepository.GetAllCampaigns());
        }

        [HttpGet("GetUsersCampaigns/{id}")]
        public IActionResult Get(int id)
        {
            List<Campaigns> campaigns = _campaignsRepository.GetAllCampaignsByUserId(id);
            if (campaigns == null)
            {
                return NotFound();
            }
            return Ok(campaigns);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Campaigns campaign = _campaignsRepository.GetCampaignById(id);
            if (campaign == null)
            {
                return NotFound();
            }
            return Ok(campaign);
        }

        [HttpPost]
        public IActionResult Post(Campaigns campaign)
        {
            _campaignsRepository.Add(campaign);
            return CreatedAtAction("Get", new { id = campaign.Id }, campaign);
        }

        [HttpPut]
        public IActionResult Put(int id, Campaigns campaign)
        {
            if (id != campaign.Id)
            {
                return BadRequest();
            }
            _campaignsRepository.Update(campaign);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _campaignsRepository.Delete(id);
            return NoContent();
        }
    }
}
