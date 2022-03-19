namespace MyForum.Web.API.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyForum.Common;
    using MyForum.Services.Data.Articles;
    using MyForum.Web.ViewModels.Articles;

    public class ArticlesController : ApiController
    {
        private readonly IArticleService articleService;

        public ArticlesController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpGet]
        public async Task<IEnumerable<ArticleDetailsViewModel>> All([FromQuery] int page = 1)
        {
            page = Math.Max(1, page);
            var skip = (page - 1) * GlobalConstants.ArticlesPerPage;

            var articles = await this.articleService.AllAsync(GlobalConstants.ArticlesPerPage, page, skip);

            return articles;
        }

        [HttpGet]
        [Authorize]
        [Route("Mine")]
        public async Task<IEnumerable<ArticleDetailsViewModel>> Mine([FromQuery] int page = 1)
        {
            page = Math.Max(1, page);
            var skip = (page - 1) * GlobalConstants.ArticlesPerPage;
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var articles = await this.articleService.AllByUserIdAsync(userId, GlobalConstants.ArticlesPerPage, page, skip);

            return articles;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CreateEditArticleResponseModel>> Create(CreateArticleInputModel inputModel)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var articleId = await this.articleService.AddArticleAsync(inputModel, userId);

            if (articleId == 0)
            {
                return this.BadRequest();
            }

            var result = new CreateEditArticleResponseModel
            {
                Id = articleId,
            };

            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ArticleDetailsViewModel> Details(int id)
        {
            var article = await this.articleService.DetailsAsync(id);

            return article;
        }

        [HttpPut]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Edit(int id, EditArticleInputModel inputModel)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.articleService.EditAsync(inputModel, userId, id);

            if (result == false)
            {
                return this.BadRequest();
            }

            var returnArticleId = new CreateEditArticleResponseModel
            {
                Id = id,
            };

            return this.Ok(returnArticleId);
        }

        [HttpDelete]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.articleService.DeleteAsync(id, userId);

            if (result == false)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        [HttpGet]
        [Route("Count")]
        public async Task<int> GetArticlesCount()
        {
            var count = await this.articleService.AllArticlesCountAsync();

            return count;
        }

        [HttpGet]
        [Authorize]
        [Route("Mine/Count")]
        public async Task<int> GetArticlesCountByCurrentUser()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var count = await this.articleService.AllArticlesCountByUserIdAsync(userId);

            return count;
        }
    }
}
