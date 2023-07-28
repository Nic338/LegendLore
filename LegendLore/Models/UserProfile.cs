using System.ComponentModel.DataAnnotations;

namespace LegendLore.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int UserTypeId { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";

            }
        }
    }
}
