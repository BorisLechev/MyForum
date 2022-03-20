namespace MyForum.Services.Data.Votes
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyForum.Data.Common.Repositories;
    using MyForum.Data.Models;

    public class VotesService : IVotesService
    {
        private readonly IDeletableEntityRepository<Vote> votesRepository;

        public VotesService(IDeletableEntityRepository<Vote> votesRepository)
        {
            this.votesRepository = votesRepository;
        }

        public async Task<int> GetVotesCountAsync(int articleId)
        {
            var count = await this.votesRepository
                .AllAsNoTracking()
                .Where(v => v.ArticleId == articleId)
                .SumAsync(v => (int)v.Type);

            return count;
        }

        public async Task VoteAsync(int articleId, string userId, bool isLikeVote)
        {
            var vote = await this.votesRepository
                .All()
                .SingleOrDefaultAsync(v => v.AuthorId == userId && v.ArticleId == articleId);

            if (vote != null)
            {
                vote.Type = isLikeVote ? VoteType.Like : VoteType.Dislike;
            }
            else
            {
                vote = new Vote
                {
                    Type = isLikeVote ? VoteType.Like : VoteType.Dislike,
                    AuthorId = userId,
                    ArticleId = articleId,
                };

                await this.votesRepository.AddAsync(vote);
            }

            await this.votesRepository.SaveChangesAsync();
        }
    }
}
