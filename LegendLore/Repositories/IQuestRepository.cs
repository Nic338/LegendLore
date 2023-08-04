using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IQuestRepository
    {
        List<Quest> GetAllQuests();
        Quest GetQuestById(int id);
        void Add(Quest quest);
        void Update(Quest quest);
        void Delete(int id);
    }
}
