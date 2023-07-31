using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class Map
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Url)]
        public string MapImage { get; set; }
        [Required]
        public int CampaignId { get; set; }
    }
}
