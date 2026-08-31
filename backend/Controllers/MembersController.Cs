using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            var members = await _context.Members
                .AsNoTracking()
                .ToListAsync();

            return Ok(members);
        }

        [HttpPost]
        public async Task<ActionResult<Member>> CreateMember(
            CreateMemberRequest request)
        {
            var member = new Member
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Position = request.Position,
                Year = request.Year
            };

            _context.Members.Add(member);

            await _context.SaveChangesAsync();

            return Created($"/api/members/{member.Id}", member);
        }
    }
}