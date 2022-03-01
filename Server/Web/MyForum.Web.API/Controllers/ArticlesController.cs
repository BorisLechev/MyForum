namespace MyForum.Web.API.Controllers
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
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
        public async Task<IEnumerable<ArticleDetailsViewModel>> All()
        {
            var articles = await this.articleService.AllAsync();

            return articles;
        }

        [HttpGet]
        [Authorize]
        [Route("Mine")]
        public async Task<IEnumerable<ArticleDetailsViewModel>> Mine()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var articles = await this.articleService.AllByUserIdAsync(userId);

            return articles;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateArticleInputModel inputModel)
        {
            inputModel.UserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.articleService.AddArticleAsync(inputModel);

            if (result == false)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
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
        public async Task<IActionResult> Edit(EditArticleInputModel inputModel)
        {
            inputModel.AuthorId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.articleService.EditAsync(inputModel);

            if (result == false)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
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
    }
}
