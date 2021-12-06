namespace PlatformaWsparciaAPI.Data.Entity
{
    public class PersonalDetails
    {
        public int PersonalDetailsID { get; set; }
        public string Town { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public Person Person { get; set; }
        public int PersonID { get; set; }
    }
}
