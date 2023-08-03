using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IMapPOIsRepository
    {
        List<MapPOIs> GetAllMapPOIs();
        List<MapPOIs> GetAllMapPOIsByMapId(int mapId);
        MapPOIs GetById(int id);
        void Add(MapPOIs mapPOI);
        void Update(MapPOIs mapPOI);
        void Delete(int id);
        void DeleteAllFromMap(int mapId);
    }
}
