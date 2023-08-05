using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POINotableLocations
    {
        public int Id { get; set; }
        [Required]
        public int NotableLocationId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
