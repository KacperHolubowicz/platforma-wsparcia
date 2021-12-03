using PlatformaWsparciaAPI.Data.DTO;
using PlatformaWsparciaAPI.Data.Entity;
using System.Linq;

namespace PlatformaWsparciaAPI.Data.Mapper
{
    public static class ClassMapper
    {
        public static DonorDTO MapToDTODonor(this Person donor)
        {
            return new DonorDTO()
            {
                DonorID = donor.PersonID,
                FirstName = donor.FirstName,
                LastName = donor.LastName,
                ContactDetails = new ContactDetailsDTO()
                {
                    Email = donor.ContactDetails.Email,
                    PhoneNumber = donor.ContactDetails.PhoneNumber
                },
                PersonalDetails = new PersonalDetailsDTO()
                {
                    Address = donor.PersonalDetails.Address,
                    Postcode = donor.PersonalDetails.Postcode,
                    Town = donor.PersonalDetails.Town
                },
                Products = donor.Products.Select(prod => new ProductDTO()
                {
                    ProductType = prod.ProductType,
                    ProductName = prod.ProductName
                }).ToList()
            };
        }

        public static PersonInNeedDTO MapToDTOPersonInNeed(this Person person)
        {
            return new PersonInNeedDTO()
            {
                PersonInNeedID = person.PersonID,
                FirstName = person.FirstName,
                LastName = person.LastName,
                ContactDetails = new ContactDetailsDTO()
                {
                    Email = person.ContactDetails.Email,
                    PhoneNumber = person.ContactDetails.PhoneNumber
                },
                PersonalDetails = new PersonalDetailsDTO()
                {
                    Address = person.PersonalDetails.Address,
                    Postcode = person.PersonalDetails.Postcode,
                    Town = person.PersonalDetails.Town
                },
                LifeSituation = new LifeSituationDTO()
                {
                    Description = person.LifeSituation.Description,
                    Priority = person.LifeSituation.Priority
                },
                LifeSituationClassification = new LifeSituationClassificationDTO()
                {
                    Age = person.LifeSituationClassification.Age,
                    ChronicIllnesses = person.LifeSituationClassification.ChronicIllnesses,
                    Dependece = person.LifeSituationClassification.Dependece,
                    FamilySituation = person.LifeSituationClassification.FamilySituation,
                    FinancialSituation = person.LifeSituationClassification.FinancialSituation,
                    HealthSituation = person.LifeSituationClassification.HealthSituation,
                    HouseholdSize = person.LifeSituationClassification.HouseholdSize,
                    StandardOfLiving = person.LifeSituationClassification.StandardOfLiving,
                    TownPopulation = person.LifeSituationClassification.TownPopulation
                },
                Products = person.Products.Select(product => new ProductDTO()
                {
                    ProductName = product.ProductName,
                    ProductType = product.ProductType
                }).ToList()
            };
        }
    }
}
