namespace MyForum.Web.ViewModels.Articles
{
    using System;

    using MyForum.Data.Models;
    using MyForum.Services.Mapping;

    public class ArticleDetailsViewModel : IMapFrom<Article>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string AuthorUserName { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
