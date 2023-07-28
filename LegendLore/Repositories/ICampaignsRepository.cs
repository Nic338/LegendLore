using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface ICampaignsRepository
    {
        List<Campaigns> GetAllCampaigns();
        List<Campaigns> GetAllCampaignsByUserId(int userProfileId);
        Campaigns GetCampaignById(int id);
        void Add(Campaigns campaign);
        void Update(Campaigns campaign);
        void Delete(int id);
    }
}
