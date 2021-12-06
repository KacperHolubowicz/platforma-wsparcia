using System.Collections.Generic;

namespace PlatformaWsparciaAPI.Data.DTO
{
    public class PersonInNeedPublicDTO
    {
        public int PersonInNeedID { get; set; }
        public string FirstName { get; set; }
        public bool Matched { get; set; }
        public string Town { get; set; }
        public string Postcode { get; set; }
        public List<ProductDTO> Products { get; set; }
    }
}
