using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class RandomEncountersTable
    {
        public int Id { get; set; }
        [Required]
        public string Encounter { get; set; }
    }
}
