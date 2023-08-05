using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class POIRandEncounterTablesRepository : BaseRepository, IPOIRandEncounterTablesRepository
    {
        public POIRandEncounterTablesRepository(IConfiguration configuration) : base(configuration) { }
        private POIRandEncounterTables NewPOIRandEncounterTableFromReader(SqlDataReader reader)
        {
            return new POIRandEncounterTables()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                RandEncountersTableId = reader.GetInt32(reader.GetOrdinal("RandEncountersTableId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }
        public List<POIRandEncounterTables> GetPOIRandEncounterTables()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.RandEncountersTableId, p.POIId
                        FROM POIRandEncounterTables p
                        ";
                    var reader = cmd.ExecuteReader();

                    var poiRandEncounterTables = new List<POIRandEncounterTables>();

                    while (reader.Read())
                    {
                        poiRandEncounterTables.Add(NewPOIRandEncounterTableFromReader(reader));
                    }
                    reader.Close();

                    return poiRandEncounterTables;
                }
            }
        }
        public List<POIRandEncounterTables> GetPOIRandEncounterTablesByPOIId(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.RandEncountersTableId, p.POIId
                        FROM POIRandEncounterTables p
                        WHERE p.POIId = @poiId
                    ";
                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    var reader = cmd.ExecuteReader();

                    var poiRandEncounterTables = new List<POIRandEncounterTables>();

                    while (reader.Read())
                    {
                        poiRandEncounterTables.Add(NewPOIRandEncounterTableFromReader(reader));
                    }
                    reader.Close();

                    return poiRandEncounterTables;
                }
            }
        }
        public POIRandEncounterTables GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.RandEncountersTableId, p.POIId
                        FROM POIRandEncounterTables p
                        WHERE p.Id = @d
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    POIRandEncounterTables poiRandEncounterTable = null;

                    if (reader.Read())
                    {
                        poiRandEncounterTable = NewPOIRandEncounterTableFromReader(reader);
                    }
                    reader.Close();

                    return poiRandEncounterTable;
                }
            }
        }
        public void Add(POIRandEncounterTables poiRandEncounterTable)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POIRandEncounterTables (
                        POIId, RandEncountersTableId)
                        OUTPUT INSERTED.ID
                        VALUES (@POIId, @RandEncounterTablesId)
                        ";
                    cmd.Parameters.AddWithValue("@POIId", poiRandEncounterTable.POIId);
                    cmd.Parameters.AddWithValue("@RandEncountersTableId", poiRandEncounterTable.RandEncountersTableId);

                    poiRandEncounterTable.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POIRandEncounterTables poiRandEncounterTable)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE POIRandEncounterTables
                        SET POIId = @POIId,
                            RandEncountersTableId = @RandEncountersTableId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", poiRandEncounterTable.Id);
                    cmd.Parameters.AddWithValue("@POIId", poiRandEncounterTable.POIId);
                    cmd.Parameters.AddWithValue("@RandEncountersTableId", poiRandEncounterTable.RandEncountersTableId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM POIRandEncounterTables
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteFromPOI(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM POIRandEncounterTables
                        WHERE POIId = @POIId
                    ";
                    cmd.Parameters.AddWithValue("@POIId", poiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
