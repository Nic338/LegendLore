using System.ComponentModel.DataAnnotations;
using Microsoft.SqlServer.Types;

namespace LegendLore.Models
{
    public class MapPOIs
    {
        public int Id { get; set; }
        [Required]
        public SqlGeography Coordinates { get; set; }
        [Required]
        public int MapId { get; set; }
        [Required]
        public int POIId { get; set; }
    }
}
