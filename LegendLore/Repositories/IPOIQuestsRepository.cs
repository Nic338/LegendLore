using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOIQuestsRepository
    {
        List<POIQuests> GetPOIQuests();
        List<POIQuests> GetPOIQuestsByPOIId(int poiId);
        POIQuests GetById(int id);
        void Add(POIQuests poiQuest);
        void Update(POIQuests poiQuest);
        void Delete(int id);
        void DeleteFromPOI(int poiId);
    }
}
