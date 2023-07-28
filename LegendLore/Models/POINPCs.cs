using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POINPCs
    {
        public int Id { get; set; }
        [Required]
        public int NPCId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
