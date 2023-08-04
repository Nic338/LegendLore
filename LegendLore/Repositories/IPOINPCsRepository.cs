using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOINPCsRepository
    {
        List<POINPCs> GetPOINPCs();
        List<POINPCs> GetPOINPCsByPOIId(int poiId);
        POINPCs GetById(int id);
        void Add(POINPCs poiNPC);
        void Update(POINPCs poiNPC);
        void Delete(int id);
        void DeleteFromPOI(int poiId);

    }
}
