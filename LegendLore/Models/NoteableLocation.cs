using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class NoteableLocation
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
