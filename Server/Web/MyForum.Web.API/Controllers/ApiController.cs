using Microsoft.AspNetCore.Mvc;

namespace MyForum.Web.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
