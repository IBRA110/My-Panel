using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required!")]
        public string UserName { get; set; }     
        [Required(ErrorMessage = "Email is required!")]
        [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", 
            ErrorMessage = "Please enter a valid e-mail address")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required!")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", 
            ErrorMessage = 
            "Password must be stronger: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }
    }
}
