namespace MyForum.Web.ViewModels.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class LoginInputModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Email is required.")]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password field is required.")]
        public string Password { get; set; }
    }
}
