namespace PlatformaWsparciaAPI.Data.Entity
{
    public class Match
    {
        public int MatchID { get; set; }
        public Person Donor { get; set; }
        public Person PersonInNeed { get; set; }
    }
}
