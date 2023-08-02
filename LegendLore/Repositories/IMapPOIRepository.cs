using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IMapPOIRepository
    {
        List<MapPOIs> GetAllMapPOIs();
        MapPOIs GetById(int id);
        void Add(MapPOIs mapPOI);
        void Update(MapPOIs mapPOI);
        void Delete(int id);
        void DeleteFromMap(int mapId);
    }
}
