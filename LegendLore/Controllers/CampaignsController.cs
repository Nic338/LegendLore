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
            return CreatedAtAction("Get", new {id = campaign.Id }, campaign);
        }

        [HttpPut]
        public IActionResult Put(int id,  Campaigns campaign)
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

        [HttpPost("upload-image")]
        public IActionResult UploadImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                // Generate a unique filename for the uploaded image
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                // Builds the fullPath variable which gets the directory of the folder which is wwwroot/MapImageUploads
                string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "MapImageUploads");
                string fullPath = Path.Combine(uploadsDirectory, uniqueFileName);
                //creates a FileStream to essentially save it to the folder
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }
                string publicImageUrl = $"/MapImageUploads/{uniqueFileName}";
                // Return the URL or file path of the saved image to the frontend
                return Ok(new { imageUrl = publicImageUrl });
            }

            return BadRequest();
        }
    }
}
