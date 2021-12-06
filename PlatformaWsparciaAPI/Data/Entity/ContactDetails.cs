using System.ComponentModel.DataAnnotations;

namespace PlatformaWsparciaAPI.Data.Entity
{
    public class ContactDetails
    {
        public int ContactDetailsID { get; set; }
        [Required] public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Person Person { get; set; }
        public int PersonID { get; set; }
    }
}
