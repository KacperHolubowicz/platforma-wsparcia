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
    [ApiController]
    [Route("api/people-in-need")]
    public class PeopleInNeedController : ControllerBase
    {
        private readonly ProjectDbContext dbContext;

        public PeopleInNeedController(ProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PersonInNeedDTO>))]
        public async Task<IActionResult> GetAllPeopleInNeed()
        {
            var people = dbContext.People
                .Include(per => per.ContactDetails)
                .Include(per => per.LifeSituation)
                .Include(per => per.LifeSituationClassification)
                .Include(per => per.PersonalDetails)
                .Include(per => per.Products)
                .ToList();

            var peopleInNeed = await Task.Run(() => people.MapToDTOPersonInNeed());
            return Ok(peopleInNeed);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PersonInNeedDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPersonInNeed(int id)
        {
            var personInNeed = await Task.Run(() => dbContext.People
                .Where(per => per.PersonID == id && per.Role == Role.PersonInNeed)
                .Include(per => per.ContactDetails)
                .Include(per => per.LifeSituation)
                .Include(per => per.LifeSituationClassification)
                .Include(per => per.PersonalDetails)
                .Include(per => per.Products)
                .FirstOrDefault());

            if (personInNeed == null)
            {
                return NotFound();
            }

            PersonInNeedDTO personDTO = personInNeed.MapToDTOPersonInNeed();
            return Ok(personDTO);
        }

        [HttpGet("public")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PersonInNeedPublicDTO>))]
        public async Task<IActionResult> GetPeopleInNeedPublic()
        {
            var peopleInNeedPublic = await Task.Run(() => dbContext.People
            .Where(per => per.Role == Role.PersonInNeed)
            .Select(per => new PersonInNeedPublicDTO()
            {
                PersonInNeedID = per.PersonID,
                Town = per.PersonalDetails.Town,
                FirstName = per.FirstName,
                Matched = per.Matched,
                Postcode = per.PersonalDetails.Postcode,
                Products = per.Products.Select(pr => new ProductDTO()
                {
                    ProductName = pr.ProductName,
                    ProductType = pr.ProductType
                }).ToList()
            }));

            return Ok(peopleInNeedPublic);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> PostPersonInNeed([FromBody] PersonInNeedPostDTO personPost)
        {
            /*
             * TODO
             * Komunikacja z modelem klasyfikujacym
             * i przydzielanie uzyskanego priorytetu
             */

            var products = personPost.Products
                .Select(prod => new Product()
                {
                    ProductName = prod.ProductName,
                    ProductType = prod.ProductType
                }).ToList();

            var personInNeed = new Person()
            {
                FirstName = personPost.FirstName,
                LastName = personPost.LastName,
                Matched = false,
                Role = Role.PersonInNeed,
                ContactDetails = new ContactDetails()
                {
                    Email = personPost.ContactDetails.Email,
                    PhoneNumber = personPost.ContactDetails.PhoneNumber
                },
                PersonalDetails = new PersonalDetails()
                {
                    Address = personPost.PersonalDetails.Address,
                    Postcode = personPost.PersonalDetails.Postcode,
                    Town = personPost.PersonalDetails.Town
                },
                LifeSituation = new LifeSituation()
                {
                    Description = personPost.Description,
                    // TODO zmienic
                    Priority = 3
                },
                LifeSituationClassification = new LifeSituationClassification()
                {
                    Age = personPost.LifeSituationClassification.Age,
                    ChronicIllnesses = personPost.LifeSituationClassification.ChronicIllnesses,
                    Dependece = personPost.LifeSituationClassification.Dependece,
                    FamilySituation = personPost.LifeSituationClassification.FamilySituation,
                    FinancialSituation = personPost.LifeSituationClassification.FinancialSituation,
                    HealthSituation = personPost.LifeSituationClassification.HealthSituation,
                    HouseholdSize = personPost.LifeSituationClassification.HouseholdSize,
                    StandardOfLiving = personPost.LifeSituationClassification.StandardOfLiving,
                    TownPopulation = personPost.LifeSituationClassification.TownPopulation
                },
                Products = products
            };

            await dbContext.People.AddAsync(personInNeed);
            await dbContext.SaveChangesAsync();
            return Accepted();
        }
    }
}