namespace MyForum.Web.ViewModels.Comments
{
    using System.ComponentModel.DataAnnotations;

    using Ganss.XSS;

    public class CreateCommentInputModel
    {
        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }

        public string SanitizedContent => new HtmlSanitizer().Sanitize(this.Content); // TinyMCE

        public int ArticleId { get; set; }

        public int? ParentId { get; set; }
    }
}
