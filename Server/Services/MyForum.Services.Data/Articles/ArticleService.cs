namespace MyForum.Services.Data.Articles
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyForum.Data.Common.Repositories;
    using MyForum.Data.Models;
    using MyForum.Services.Mapping;
    using MyForum.Web.ViewModels.Articles;

    public class ArticleService : IArticleService
    {
        private readonly IDeletableEntityRepository<Article> articlesRepository;

        public ArticleService(IDeletableEntityRepository<Article> articlesRepository)
        {
            this.articlesRepository = articlesRepository;
        }

        public async Task<int> AddArticleAsync(CreateArticleInputModel inputModel, string userId)
        {
            var article = new Article
            {
                Title = inputModel.Title,
                Content = inputModel.SanitizedContent,
                AuthorId = userId,
            };

            await this.articlesRepository.AddAsync(article);
            await this.articlesRepository.SaveChangesAsync();

            return article.Id;
        }

        public async Task<IEnumerable<ArticleDetailsViewModel>> AllAsync(int articlesPerPage, int page, int skip = 0)
        {
            var articles = await this.articlesRepository
                .AllAsNoTracking()
                .Skip(skip)
                .Take(articlesPerPage)
                .To<ArticleDetailsViewModel>()
                .ToListAsync();

            return articles;
        }

        public async Task<int> AllArticlesCountAsync()
        {
            var count = await this.articlesRepository
                .AllAsNoTracking()
                .CountAsync();

            return count;
        }

        public async Task<IEnumerable<ArticleDetailsViewModel>> AllByUserIdAsync(string userId, int articlesPerPage, int page, int skip = 0)
        {
            var articles = await this.articlesRepository
                .AllAsNoTracking()
                .Where(a => a.AuthorId == userId)
                .OrderByDescending(a => a.CreatedOn)
                .Skip(skip)
                .Take(articlesPerPage)
                .To<ArticleDetailsViewModel>()
                .ToListAsync();

            return articles;
        }

        public async Task<int> AllArticlesCountByUserIdAsync(string userId)
        {
            var count = await this.articlesRepository
                .AllAsNoTracking()
                .CountAsync(a => a.AuthorId == userId);

            return count;
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var article = await this.articlesRepository
                .All()
                .SingleOrDefaultAsync(a => a.Id == id);

            if (article == null)
            {
                return false;
            }

            if (article.AuthorId != userId)
            {
                return false;
            }

            this.articlesRepository.Delete(article);
            var result = await this.articlesRepository.SaveChangesAsync();

            return result > 0;
        }

        public async Task<ArticleDetailsViewModel> DetailsAsync(int id)
        {
            var article = await this.articlesRepository
                .AllAsNoTracking()
                .Where(a => a.Id == id)
                .To<ArticleDetailsViewModel>()
                .SingleOrDefaultAsync();

            return article;
        }

        public async Task<bool> EditAsync(EditArticleInputModel inputModel, string userId, int articleId)
        {
            var article = await this.articlesRepository
                .All()
                .SingleOrDefaultAsync(a => a.Id == articleId);

            if (userId != article.AuthorId)
            {
                return false;
            }

            article.Title = inputModel.Title;
            article.Content = inputModel.SanitizedContent;

            this.articlesRepository.Update(article);
            var result = await this.articlesRepository.SaveChangesAsync();

            return result > 0;
        }
    }
}
