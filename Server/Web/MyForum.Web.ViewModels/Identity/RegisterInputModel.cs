namespace MyForum.Web.ViewModels.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterInputModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Username is required.")]
        [StringLength(15, ErrorMessage = "{0} should be between {2} and {1} characters long.", MinimumLength = 2)]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Email is required.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password is required.")]
        [StringLength(20, ErrorMessage = "{0} should be between {2} and {1} characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
