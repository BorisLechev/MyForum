namespace MyForum.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MyForum.Web.ViewModels.Articles;

    public interface IArticleService
    {
        Task<IEnumerable<ArticleDetailsViewModel>> AllAsync();

        Task<IEnumerable<ArticleDetailsViewModel>> AllByUserIdAsync(string userId);

        Task<bool> AddArticleAsync(CreateArticleInputModel inputModel);

        Task<ArticleDetailsViewModel> DetailsAsync(int id);

        Task<bool> EditAsync(EditArticleInputModel inputModel);

        Task<bool> DeleteAsync(int id, string userId);
    }
}
