using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        [Required(ErrorMessage = "Email is required!")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", 
            ErrorMessage = "Please enter a valid e-mail address")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Password is required!")]
        [StringLength(24, MinimumLength = 8, ErrorMessage = "Password must be greater than 8!")]
        public string Password { get; set; }

    }
}