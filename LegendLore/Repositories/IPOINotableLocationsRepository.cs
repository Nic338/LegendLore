using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOINotableLocationsRepository
    {
        List<POINotableLocations> GetPOINotableLocations();
        List<POINotableLocations> GetPOINotableLocationsByPOIId(int poiId);
        POINotableLocations GetById(int id);
        void Add(POINotableLocations poiNotableLocation);
        void Update(POINotableLocations poiNotableLocation);
        void Delete(int id);
        void DeleteFromPOI(int poiId);
    }
}
