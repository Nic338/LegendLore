using LegendLore.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LegendLore.Models;

namespace LegendLore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly IMapRepository _mapRepository;

        public MapController(IMapRepository mapRepository)
        {
            _mapRepository = mapRepository;
        }

        [HttpGet("GetMapsByCampaign")]
        public IActionResult Get(int id)
        {
            List<Map> maps = _mapRepository.GetAllMapsByCampaignId(id);
            if(maps == null)
            {
                return NotFound();
            }
            return Ok(maps);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            Map map = _mapRepository.GetMapById(id);
            if (map == null)
            {
                return NotFound();
            }
            return Ok(map);
        }

        [HttpPost]
        public IActionResult Post(Map map)
        {
            _mapRepository.Add(map);
            return CreatedAtAction("Get", new { id = map.Id }, map);
        }

        [HttpPut]
        public IActionResult Put(int id, Map map)
        {
            if (id != map.Id)
            {
                return BadRequest();
            }
            _mapRepository.Update(map);
            return NoContent();
        }

        [HttpPost("upload-map-image")]
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
