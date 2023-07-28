using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class Map
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int POIId { get; set; }
        [Required]
        public int CampaignId { get; set; }
    }
}
