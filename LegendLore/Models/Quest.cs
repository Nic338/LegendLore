using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class Quest
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public string Reward { get; set; }
    }
}
