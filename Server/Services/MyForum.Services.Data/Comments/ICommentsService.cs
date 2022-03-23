namespace MyForum.Services.Data.Comments
{
    using System.Threading.Tasks;

    using MyForum.Web.ViewModels.Comments;

    public interface ICommentsService
    {
        Task<int> CreateAsync(CreateCommentInputModel inputModel, string authorId);

        Task<Result> EditAsync(EditCommentInputModel inputModel, string authorId);

        Task<Result> DeleteAsync(int commentId, string authorId);
    }
}
