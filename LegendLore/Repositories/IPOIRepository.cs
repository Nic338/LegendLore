using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOIRepository
    {
        List<POI> GetAllPOIs();
        POI GetPOIById(int id);
        void Add(POI singlePOI);
        void Update(POI singlePOI);
        void Delete(int id);
    }
}
