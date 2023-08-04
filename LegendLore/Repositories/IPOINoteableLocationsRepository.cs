using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOINoteableLocationsRepository
    {
        List<POINoteableLocations> GetPOINoteableLocations();
        List<POINoteableLocations> GetPOINoteableLocationsByPOIId(int poiId);
        POINoteableLocations GetById(int id);
        void Add(POINoteableLocations poiNoteableLocation);
        void Update(POINoteableLocations poiNoteableLocation);
        void Delete(int id);
        void DeleteFromPOI(int poiId);
    }
}
