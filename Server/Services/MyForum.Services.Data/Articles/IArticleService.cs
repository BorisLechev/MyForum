namespace MyForum.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyForum.Web.ViewModels.Articles;

    public interface IArticleService
    {
        Task<IEnumerable<ArticleDetailsViewModel>> AllAsync(int articlesPerPage, int page, int skip);

        Task<int> AllArticlesCountAsync();

        Task<IEnumerable<ArticleDetailsViewModel>> AllByUserIdAsync(string userId, int articlesPerPage, int page, int skip);

        Task<int> AllArticlesCountByUserIdAsync(string userId);

        Task<int> AddArticleAsync(CreateArticleInputModel inputModel, string userId);

        Task<ArticleDetailsViewModel> DetailsAsync(int id);

        Task<bool> EditAsync(EditArticleInputModel inputModel, string userId, int articleId);

        Task<bool> DeleteAsync(int id, string userId);
    }
}
