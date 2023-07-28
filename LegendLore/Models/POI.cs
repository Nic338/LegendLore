using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class POI
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int NPCId { get; set; }
        public int QuestId { get; set; }
        public int LocationId { get; set; }
        public int RandEncountersId { get; set; }
    }
}
