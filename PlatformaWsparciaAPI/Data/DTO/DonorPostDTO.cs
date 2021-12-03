using System.Collections.Generic;

namespace PlatformaWsparciaAPI.Data.DTO
{
    public class DonorPostDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ContactDetailsDTO ContactDetails { get; set; }
        public PersonalDetailsDTO PersonalDetails { get; set; }
        public List<ProductDTO> Products { get; set; }
    }
}