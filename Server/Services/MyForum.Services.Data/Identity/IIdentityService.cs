namespace MyForum.Services.Data.Identity
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string email, string appSettingsSecret);
    }
}
