namespace MyForum.Services.Data.Votes
{
    using System.Threading.Tasks;

    using MyForum.Data.Models;

    public interface IVotesService
    {
        Task<int> GetVotesCountAsync(int articleId);

        Task VoteAsync(int articleId, string userId, bool isLikeVote);
    }
}
