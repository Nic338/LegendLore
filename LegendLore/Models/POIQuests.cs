using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POIQuests
    {
        public int Id { get; set; }
        [Required]
        public int QuestId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
