namespace PlatformaWsparciaAPI.Data.DTO
{
    public class LifeSituationFullDTO
    {
        public LifeSituationFullDTO(PersonInNeedPostDTO person)
        {
            Age = person.LifeSituationClassification.Age;
            TownPopulation = person.LifeSituationClassification.TownPopulation;
            HouseholdSize = person.LifeSituationClassification.HouseholdSize;
            FamilySituation = person.LifeSituationClassification.FamilySituation;
            FinancialSituation = person.LifeSituationClassification.FinancialSituation;
            HealthSituation = person.LifeSituationClassification.HealthSituation;
            StandardOfLiving = person.LifeSituationClassification.StandardOfLiving;
            ChronicIllnesses = person.LifeSituationClassification.ChronicIllnesses;
            Dependece = person.LifeSituationClassification.Dependece;
            Description = person.Description;
        }

        public int Age { get; set; }
        public int TownPopulation { get; set; }
        public int HouseholdSize { get; set; }
        public int FinancialSituation { get; set; }
        public int HealthSituation { get; set; }
        public int StandardOfLiving { get; set; }
        public int FamilySituation { get; set; }
        public bool ChronicIllnesses { get; set; }
        public bool Dependece { get; set; }
        public string Description { get; set; }
    }
}
