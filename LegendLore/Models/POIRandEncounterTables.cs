using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POIRandEncounterTables
    {
        public int Id { get; set; }
        [Required]
        public int RandEncountersTableId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
