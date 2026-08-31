using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CreateMemberRequest
    {
        [Required]
        public string FirstName { get; set; } = "";

        [Required]
        public string LastName { get; set; } = "";

        [Required]
        public string Position { get; set; } = "";

        [Range(2020, 2040)]
        public int Year { get; set; }
    }
}