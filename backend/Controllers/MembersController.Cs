using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetMembers()
        {
            var members = new List<Member>
            {
                new Member
                {
                    Id = 1,
                    FirstName = "Maya",
                    LastName = "Shvab",
                    Position = "President",
                    Year = 2026
                },

                new Member
                {
                    Id = 2,
                    FirstName = "Laura",
                    LastName = "Jun",
                    Position = "Member",
                    Year = 2030
                },

                new Member
                {
                    Id = 3,
                    FirstName = "Adison",
                    LastName = "Gurley",
                    Position = "Merch Chair",
                    Year = 2028
                },

                new Member
                {
                    Id = 4,
                    FirstName = "Isabel",
                    LastName = "Ketterson",
                    Position = "Treasurer",
                    Year = 2028
                }
        
            };

            return Ok(members);
        }
    }
}