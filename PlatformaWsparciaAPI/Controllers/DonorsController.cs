using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlatformaWsparciaAPI.Data;
using PlatformaWsparciaAPI.Data.DTO;
using PlatformaWsparciaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatformaWsparciaAPI.Controllers
{
    [Route("api/[controller]")]
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
            IEnumerable<DonorDTO> donors = await Task.Run(() => dbContext.People
                .Where(person => person.Role == Role.Donor)
                .Select(person => new DonorDTO()
                {
                    DonorID = person.PersonID,
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    Email = person.ContactDetails.Email,
                    PhoneNumber = person.ContactDetails.PhoneNumber,
                    Products = person.Products.Select(prod => new ProductDTO()
                    {
                        ProductType = prod.ProductType,
                        ProductName = prod.ProductName
                    }).ToList()
                }));

            return Ok(donors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonorDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDonor(int personId)
        {
            var donor = await dbContext.People.FindAsync(personId);
            if(donor == null)
            {
                return NotFound();
            }
            DonorDTO donorDTO = new DonorDTO()
            {
                DonorID = donor.PersonID,
                FirstName = donor.FirstName,
                LastName = donor.LastName,
                Email = donor.ContactDetails.Email,
                PhoneNumber = donor.ContactDetails.PhoneNumber,
                Products = donor.Products.Select(prod => new ProductDTO()
                {
                    ProductType = prod.ProductType,
                    ProductName = prod.ProductName
                }).ToList()
            };

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
                    Email = donor.Email,
                    PhoneNumber = donor.PhoneNumber
                },
                Products = products,
                Matched = false
            };
            donorEntity.Products.ForEach(pr => pr.Person = donorEntity);

            await dbContext.People.AddAsync(donorEntity);
            await dbContext.Products.AddRangeAsync(products);
            await dbContext.SaveChangesAsync();
            return Accepted();
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PatchDonor(int id)
        {
            var donor = await dbContext.People.FindAsync(id);
            if(donor == null)
            {
                return NotFound();
            }

            donor.Matched = true;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return Accepted();
        }
    }
}
