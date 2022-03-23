namespace MyForum.Web.ViewModels.Comments
{
    using System.ComponentModel.DataAnnotations;

    using Ganss.XSS;

    public interface EditCommentInputModel
    {
        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }

        public string SanitizedContent => new HtmlSanitizer().Sanitize(this.Content); // TinyMCE

        public int CommentId { get; set; }
    }
}
