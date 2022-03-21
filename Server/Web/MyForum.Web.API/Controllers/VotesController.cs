namespace MyForum.Web.API.Controllers
{
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using MyForum.Services.Data.Votes;
    using MyForum.Web.ViewModels.Votes;

    public class VotesController : ApiController
    {
        private readonly IVotesService votesService;

        public VotesController(IVotesService votesService)
        {
            this.votesService = votesService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<VoteResponseModel>> GetVotes(int articleId)
        {
            var votesCount = await this.votesService.GetVotesCountAsync(articleId);
            var result = new VoteResponseModel
            {
                VotesCount = votesCount,
            };

            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<VoteResponseModel>> Vote(VoteInputModel model)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.votesService.VoteAsync(model.ArticleId, userId, model.IsLikeVote);

            var votesCount = await this.votesService.GetVotesCountAsync(model.ArticleId);

            var result = new VoteResponseModel
            {
                VotesCount = votesCount,
            };

            return result;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserVoteTypeResponseModel>> GetUserVoteType([FromQuery] int articleId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await this.votesService.GetUserVoteTypeAsync(articleId, userId);

            return result;
        }
    }
}
