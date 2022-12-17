using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Invalid email address!")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Password is required!")]
        [StringLength(24, MinimumLength = 8, ErrorMessage = "Password must be greater than 8!")]
        public string Password { get; set; }
    }
}