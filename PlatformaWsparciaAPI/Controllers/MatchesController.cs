using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlatformaWsparciaAPI.Data;
using PlatformaWsparciaAPI.Data.DTO;
using PlatformaWsparciaAPI.Data.Entity;
using PlatformaWsparciaAPI.Data.Mapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatformaWsparciaAPI.Controllers
{
    [Route("api/matches")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly ProjectDbContext dbContext;

        public MatchesController(ProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostMatch([FromBody] MatchPostDTO matchPost)
        {
            Person donor = dbContext.People
                .FirstOrDefault(per => per.PersonID == matchPost.DonorID
                                && per.Role == Role.Donor);
            Person personInNeed = dbContext.People
                .FirstOrDefault(per => per.PersonID == matchPost.PersonInNeedID
                                && per.Role == Role.PersonInNeed);

            if(donor == null || personInNeed == null)
            {
                return BadRequest();
            }

            donor.Matched = true;
            personInNeed.Matched = true;

            Match match = new Match()
            {
                Donor = donor,
                PersonInNeed = personInNeed
            };

            await dbContext.Matches.AddAsync(match);
            await dbContext.SaveChangesAsync();
            return Accepted();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<MatchDTO>))]
        public async Task<IActionResult> GetMatches()
        {
            var matches = await Task.Run(() => dbContext.Matches
                .Include(m => m.Donor).ThenInclude(d => d.Products)
                .Include(m => m.Donor).ThenInclude(d => d.PersonalDetails)
                .Include(m => m.Donor).ThenInclude(d => d.ContactDetails)
                .Include(m => m.PersonInNeed).ThenInclude(p => p.ContactDetails)
                .Include(m => m.PersonInNeed).ThenInclude(p => p.LifeSituation)
                .Include(m => m.PersonInNeed).ThenInclude(p => p.LifeSituationClassification)
                .Include(m => m.PersonInNeed).ThenInclude(p => p.Products)
                .Include(m => m.PersonInNeed).ThenInclude(p => p.PersonalDetails)
            );

            var matchesDTO = matches
                .Select(m => new MatchDTO()
                {
                    Donor = m.Donor.MapToDTODonor(),
                    PersonInNeed = m.PersonInNeed.MapToDTOPersonInNeed()
                });

            return Ok(matchesDTO);
        }
    }
}
