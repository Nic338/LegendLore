using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POINoteableLocations
    {
        public int Id { get; set; }
        [Required]
        public int NoteableLocationId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
