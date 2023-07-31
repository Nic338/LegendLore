using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class Campaigns
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime CreateDateTime { get; set; }
        [Required]
        public int UserProfileId { get; set; }
    }
}
