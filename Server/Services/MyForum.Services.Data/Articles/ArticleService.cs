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

        public async Task<bool> AddArticleAsync(CreateArticleInputModel inputModel)
        {
            var article = new Article
            {
                Title = inputModel.Title,
                Content = inputModel.SanitizedContent,
                AuthorId = inputModel.UserId,
            };

            await this.articlesRepository.AddAsync(article);
            var result = await this.articlesRepository.SaveChangesAsync();

            return result > 0;
        }

        public async Task<IEnumerable<ArticleDetailsViewModel>> AllAsync()
        {
            var articles = await this.articlesRepository
                .AllAsNoTracking()
                .To<ArticleDetailsViewModel>()
                .ToListAsync();

            return articles;
        }

        public async Task<IEnumerable<ArticleDetailsViewModel>> AllByUserIdAsync(string userId)
        {
            var articles = await this.articlesRepository
                .AllAsNoTracking()
                .Where(a => a.AuthorId == userId)
                .To<ArticleDetailsViewModel>()
                .ToListAsync();

            return articles;
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

        public async Task<bool> EditAsync(EditArticleInputModel inputModel)
        {
            var article = await this.articlesRepository
                .All()
                .SingleOrDefaultAsync(a => a.Id == inputModel.Id);

            if (inputModel.AuthorId != article.AuthorId)
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
