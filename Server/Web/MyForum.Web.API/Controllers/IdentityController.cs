namespace MyForum.Web.API.Controllers
{
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MyForum.Common;
    using MyForum.Data.Models;
    using MyForum.Services.Data.Identity;
    using MyForum.Web.ViewModels.Identity;

    [AllowAnonymous]
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;
        private readonly ApplicationSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<ApplicationSettings> appSettings,
            IIdentityService identityService)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<IActionResult> Register([FromBody] RegisterInputModel inputModel)
        {
            var user = new User
            {
                Email = inputModel.Email,
                UserName = inputModel.UserName,
            };

            var result = await this.userManager.CreateAsync(user, inputModel.Password);

            if (result.Succeeded == false)
            {
                return this.BadRequest(result.Errors);
            }

            await this.userManager.AddToRoleAsync(user, GlobalConstants.UserRoleName);

            var loginInputModel = new LoginInputModel
            {
                UserName = inputModel.UserName,
                Password = inputModel.Password,
            };

            return await this.Login(loginInputModel);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<IActionResult> Login(LoginInputModel inputModel)
        {
            var user = await this.userManager.FindByNameAsync(inputModel.UserName);

            if (user == null)
            {
                return this.Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, inputModel.Password);

            if (passwordValid == false)
            {
                return this.Unauthorized();
            }

            var encryptedToken = this.identityService.GenerateJwtToken(user.Id, user.UserName, user.Email, this.appSettings.Secret);

            return this.Ok(new LoginResponseModel
            {
                Username = user.UserName,
                UserId = user.Id,
                Token = encryptedToken,
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<LoginResponseModel>> GetUserDetails()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = this.User.Identity.Name;
            var email = this.User.FindFirstValue(ClaimTypes.Email);

            var encryptedToken = this.identityService.GenerateJwtToken(userId, userName, email, this.appSettings.Secret);

            var result = new LoginResponseModel
            {
                UserId = userId,
                Username = userName,
                Token = encryptedToken,
            };

            return result;
        }
    }
}
