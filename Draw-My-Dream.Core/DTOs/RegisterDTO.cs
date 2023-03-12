using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required!")]
        public string UserName { get; set; }     
        [Required(ErrorMessage = "Email is required!")]
        [RegularExpression("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$", 
            ErrorMessage = "Please enter a valid e-mail address")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required!")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", 
            ErrorMessage = 
            "Password must be stronger: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }
    }
}
