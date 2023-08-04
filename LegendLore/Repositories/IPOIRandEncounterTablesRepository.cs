using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IPOIRandEncounterTablesRepository
    {
        List<POIRandEncounterTables> GetPOIRandEncounterTables();
        List<POIRandEncounterTables> GetPOIRandEncounterTablesByPOIId(int poiId);
        POIRandEncounterTables GetById(int id);
        void Add(POIRandEncounterTables poiRandEncounterTable);
        void Update(POIRandEncounterTables poiRandEncounterTable);
        void Delete(int id);
        void DeleteFromPOI(int poiId);
    }
}
