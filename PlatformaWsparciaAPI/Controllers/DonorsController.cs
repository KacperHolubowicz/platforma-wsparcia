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
    [Route("api/donors")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly ProjectDbContext dbContext;

        public DonorsController(ProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<DonorDTO>))]
        public async Task<IActionResult> GetAllDonors()
        {
            var people = dbContext.People
                .Include(per => per.ContactDetails)
                .Include(per => per.PersonalDetails)
                .Include(per => per.Products)
                .ToList();

            IEnumerable<DonorDTO> donors = await Task.Run(() => people.MapToDTODonor());
            return Ok(donors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonorDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDonor(int id)
        {
            var donor = await Task.Run(() => dbContext.People
                .Where(per => per.PersonID == id && per.Role == Role.Donor)
                .Include(per => per.ContactDetails)
                .Include(per => per.PersonalDetails)
                .Include(per => per.Products)
                .FirstOrDefault());

            if (donor == null)
            {
                return NotFound();
            }

            DonorDTO donorDTO = donor.MapToDTODonor();

            return Ok(donorDTO);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public async Task<IActionResult> PostDonor([FromBody] DonorPostDTO donor)
        {
            var products = donor.Products
                .Select(pr => new Product()
                {
                    ProductType = pr.ProductType,
                    ProductName = pr.ProductName
                }).ToList();
            var donorEntity = new Person()
            {
                FirstName = donor.FirstName,
                LastName = donor.LastName,
                Role = Role.Donor,
                ContactDetails = new ContactDetails()
                {
                    Email = donor.ContactDetails.Email,
                    PhoneNumber = donor.ContactDetails.PhoneNumber
                },
                PersonalDetails = new PersonalDetails()
                {
                    Address = donor.PersonalDetails.Address,
                    Postcode = donor.PersonalDetails.Postcode,
                    Town = donor.PersonalDetails.Town
                },
                Products = products,
                Matched = false
            };

            await dbContext.People.AddAsync(donorEntity);
            await dbContext.SaveChangesAsync();
            return Accepted();
        }
    }
}
