namespace MyForum.Services.Data.Votes
{
    using System.Threading.Tasks;

    using MyForum.Web.ViewModels.Votes;

    public interface IVotesService
    {
        Task<int> GetVotesCountAsync(int articleId);

        Task VoteAsync(int articleId, string userId, bool isLikeVote);

        Task<UserVoteTypeResponseModel> GetUserVoteTypeAsync(int articleId, string userId);
    }
}
