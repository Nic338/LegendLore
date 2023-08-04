using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface INPCRepository
    {
        List<NPC> GetAllNPCs();
        NPC GetNPCbyId(int id);
        void Add(NPC singleNPC);
        void Update(NPC singleNPC);
        void Delete(int id);

    }
}
