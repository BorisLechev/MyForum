namespace MyForum.Services.Data.Comments
{
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using MyForum.Data.Common.Repositories;
    using MyForum.Data.Models;
    using MyForum.Web.ViewModels.Comments;

    public class CommentsService : ICommentsService
    {
        private readonly IDeletableEntityRepository<Comment> commentsRepository;

        public CommentsService(IDeletableEntityRepository<Comment> commentsRepository)
        {
            this.commentsRepository = commentsRepository;
        }

        public async Task<int> CreateAsync(CreateCommentInputModel inputModel, string authorId)
        {
            var comment = new Comment
            {
                Content = inputModel.SanitizedContent,
                ArticleId = inputModel.ArticleId,
                AuthorId = authorId,
                ParentId = inputModel.ParentId,
            };

            await this.commentsRepository.AddAsync(comment);
            await this.commentsRepository.SaveChangesAsync();

            return comment.Id;
        }

        public async Task<Result> EditAsync(EditCommentInputModel inputModel, string authorId)
        {
            var comment = await this.commentsRepository
                .All()
                .SingleOrDefaultAsync(c => c.Id == inputModel.CommentId);

            if (comment == null)
            {
                return "Non-existing comment.";
            }

            if (comment.AuthorId != authorId)
            {
                return "Only the author can edit its comment.";
            }

            comment.Content = inputModel.SanitizedContent;

            var result = await this.commentsRepository.SaveChangesAsync();

            return result > 0;
        }

        public async Task<Result> DeleteAsync(int commentId, string authorId)
        {
            var comment = await this.commentsRepository
                .All()
                .SingleOrDefaultAsync(c => c.Id == commentId && c.AuthorId == authorId);

            if (comment == null)
            {
                return "You cannot delete a non-existing comment.";
            }

            this.commentsRepository.Delete(comment);

            var result = await this.commentsRepository.SaveChangesAsync();

            return result > 0;
        }
    }
}
