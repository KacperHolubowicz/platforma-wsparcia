using PlatformaWsparciaAPI.Data.DTO;
using PlatformaWsparciaAPI.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace PlatformaWsparciaAPI.Data.Mapper
{
    public static class LinqMapperExtension
    {
        public static IEnumerable<PersonInNeedDTO> MapToDTOPersonInNeed(this IEnumerable<Person> people)
        {
            return people
                .Where(person => person.Role == Role.PersonInNeed
                    && !person.Matched)
                .Select(person => person.MapToDTOPersonInNeed());
        }

        public static IEnumerable<DonorDTO> MapToDTODonor(this IEnumerable<Person> people)
        {
            return people
                .Where(person => person.Role == Role.Donor)
                .Select(person => person.MapToDTODonor());
        }
    }
}
