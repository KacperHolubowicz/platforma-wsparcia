namespace PlatformaWsparciaAPI.Data.Entity
{
    public class LifeSituationClassification
    {
        public int LifeSituationClassificationID { get; set; }
        public int Age { get; set; }
        public int TownPopulation { get; set; }
        public int HouseholdSize { get; set; }
        public int FinancialSituation { get; set; }
        public int HealthSituation { get; set; }
        public int StandardOfLiving { get; set; }
        public int FamilySituation { get; set; }
        public bool ChronicIllnesses { get; set; }
        public bool Dependece { get; set; }
        public Person Person { get; set; }
        public int PersonID { get; set; }
    }
}
