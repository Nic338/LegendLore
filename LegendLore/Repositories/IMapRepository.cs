using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IMapRepository
    {
        List<Map> GetAllMapsByCampaignId(int campaignId);
        Map GetMapById(int id);
        void Add(Map map);
        void Update(Map map);
    }
}
