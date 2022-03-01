namespace MyForum.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using MyForum.Common;
    using MyForum.Data.Common.Models;

    public class Article : BaseDeletableModel<int>
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(GlobalConstants.TitleMaxLength)]
        public string Title { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Content { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public virtual User Author { get; set; }
    }
}
