using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface INoteableLocationRepository
    {
        List<NoteableLocation> GetAllNoteableLocations();
        NoteableLocation GetNoteableLocationById(int id);
        void Add(NoteableLocation noteableLocation);
        void Update(NoteableLocation noteableLocation);
        void Delete(int id);
    }
}
