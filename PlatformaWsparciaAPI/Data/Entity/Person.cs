using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlatformaWsparciaAPI.Data.Entity
{
    public class Person
    {
        public int PersonID { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public bool Matched { get; set; }
        [Required] public Role Role { get; set; }
        [Required] public ContactDetails ContactDetails { get; set; }
        [Required] public List<Product> Products { get; set; }
        public PersonalDetails PersonalDetails { get; set; }
        public LifeSituation LifeSituation { get; set; }
        public LifeSituationClassification LifeSituationClassification { get; set; }
    }
}
