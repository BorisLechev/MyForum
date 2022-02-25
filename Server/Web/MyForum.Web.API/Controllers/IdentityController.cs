namespace MyForum.Web.API.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using MyForum.Common;
    using MyForum.Data.Models;
    using MyForum.Web.ViewModels.Identity;

    [AllowAnonymous]
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly ApplicationSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<ApplicationSettings> appSettings)
        {
            this.userManager = userManager;
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
                Email = inputModel.Email,
                Password = inputModel.Password,
            };

            return await this.Login(loginInputModel);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<IActionResult> Login(LoginInputModel inputModel)
        {
            var user = await this.userManager.FindByEmailAsync(inputModel.Email);

            if (user == null)
            {
                return this.Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, inputModel.Password);

            if (passwordValid == false)
            {
                return this.Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Email, user.Email),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return this.Ok(new LoginResponseModel
            {
                Email = user.Email,
                UserName = user.UserName,
                UserId = user.Id,
                Token = encryptedToken,
            });
        }
    }
}
