using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlatformaWsparciaAPI.Data;
using PlatformaWsparciaAPI.Data.Entity;
using System.Linq;

namespace PlatformaWsparciaAPI.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ProjectDbContext dbContext;

        public LoginController(ProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AdminAccount))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Login(string login, string password)
        {
            var account = dbContext.AdminAccount.First();
            if(account.Login == login && account.Password == password)
            {
                return Ok(account);
            }

            return NotFound();
        }
    }
}
