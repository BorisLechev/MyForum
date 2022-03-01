namespace MyForum.Web.ViewModels.Articles
{
    using System.ComponentModel.DataAnnotations;

    using Ganss.XSS;
    using MyForum.Common;

    public class CreateArticleInputModel
    {
        [Required(AllowEmptyStrings = false)]
        [MinLength(GlobalConstants.TitleMinLength)]
        [MaxLength(GlobalConstants.TitleMaxLength)]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }

        public string SanitizedContent => new HtmlSanitizer().Sanitize(this.Content);

        public string UserId { get; set; }
    }
}
