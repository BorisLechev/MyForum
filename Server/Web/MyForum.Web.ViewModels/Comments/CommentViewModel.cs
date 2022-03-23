namespace MyForum.Web.ViewModels.Comments
{
    using System;

    using MyForum.Data.Models;
    using MyForum.Services.Mapping;

    public class CommentViewModel : IMapFrom<Comment>
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string AuthorUserName { get; set; }

        public int? ParentId { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
