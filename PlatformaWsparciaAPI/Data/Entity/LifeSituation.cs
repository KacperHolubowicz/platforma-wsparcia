namespace PlatformaWsparciaAPI.Data.Entity
{
    public class LifeSituation
    {
        public int LifeSituationID { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public Person Person { get; set; }
        public int PersonID { get; set; }
    }
}
