using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IRandomEncountersTableRepository
    {
        List<RandomEncountersTable> GetAllRandomEncounterTables();
        RandomEncountersTable GetRandomEncountersTableById(int id);
        void Add(RandomEncountersTable table);
        void Update(RandomEncountersTable table);
        void Delete(int id);
    }
}
