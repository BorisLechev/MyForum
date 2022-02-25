namespace MyForum.Web.ViewModels.StatusCodes
{
    using Microsoft.AspNetCore.Mvc;

    public class BadRequestResponseModel : ProblemDetails
    {
        public string Message { get; set; }
    }
}
