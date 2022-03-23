namespace MyForum.Web.API.Controllers
{
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyForum.Services.Data.Comments;
    using MyForum.Web.ViewModels.Comments;

    public class CommentsController : ApiController
    {
        private readonly ICommentsService commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            this.commentsService = commentsService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CreateEditCommentResponseModel>> Create(
            [FromBody] CreateCommentInputModel input)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var commentId = await this.commentsService.CreateAsync(input, userId);

            var result = new CreateEditCommentResponseModel
            {
                CommentId = commentId,
            };

            return result;
        }

        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<CreateEditCommentResponseModel>> Edit(
            [FromRoute] int id,
            [FromBody] EditCommentInputModel input)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.commentsService.EditAsync(input, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            var responseModel = new CreateEditCommentResponseModel
            {
                CommentId = id,
            };

            return responseModel;
        }

        [HttpDelete]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await this.commentsService.DeleteAsync(id, userId);

            if (result.Failure)
            {
                return this.BadRequest(result.Error);
            }

            return this.Ok();
        }
    }
}
