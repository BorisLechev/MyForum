namespace MyForum.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    using MyForum.Data.Common.Models;

    public class Vote : BaseDeletableModel<int>
    {
        public VoteType Type { get; set; }

        public int ArticleId { get; set; }

        public virtual Article Article { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public virtual User Author { get; set; }
    }
}
