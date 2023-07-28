using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class MapPOIs
    {
        public int Id { get; set; }
        [Required]
        public string Coordinates { get; set; }
        [Required]
        public int MapId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
