using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class People : ControllerBase {
        [HttpGet]
        public IActionResult Get() {
               return Ok(new[] { new { Name = "Jenn" }, new { Name = "Violet" } });
        }
    }
}
