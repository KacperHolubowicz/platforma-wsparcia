using PlatformaWsparciaAPI.Data.DTO;
using System.Threading.Tasks;

namespace PlatformaWsparciaAPI.Service
{
    public interface IPriorityService
    {
        public Task<int> GetPriorityAsync(LifeSituationFullDTO lifeSituation);
    }
}
