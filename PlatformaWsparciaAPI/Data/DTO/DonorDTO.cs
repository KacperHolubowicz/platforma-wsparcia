using System.Collections.Generic;

namespace PlatformaWsparciaAPI.Data.DTO
{
    public class DonorDTO
    {
        public int DonorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ContactDetailsDTO ContactDetails { get; set; }
        public PersonalDetailsDTO PersonalDetails { get; set; }
        public List<ProductDTO> Products { get; set; }
    }
}
