using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface INotableLocationRepository
    {
        List<NotableLocation> GetAllNotableLocations();
        NotableLocation GetNotableLocationById(int id);
        void Add(NotableLocation notableLocation);
        void Update(NotableLocation notableLocation);
        void Delete(int id);
    }
}
