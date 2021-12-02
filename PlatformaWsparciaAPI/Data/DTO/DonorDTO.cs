using System.Collections.Generic;

namespace PlatformaWsparciaAPI.Data.DTO
{
    public class DonorDTO
    {
        public int DonorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
#nullable enable
        public string? Email { get; set; }
#nullable disable
        public List<ProductDTO> Products { get; set; }
    }
}
