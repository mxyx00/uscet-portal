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


        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            return Ok(member);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(
            int id,
            UpdateMemberRequest request)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            member.FirstName = request.FirstName;
            member.LastName = request.LastName;
            member.Position = request.Position;
            member.Year = request.Year;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);

            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}