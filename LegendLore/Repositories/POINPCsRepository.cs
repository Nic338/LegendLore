using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class POINPCsRepository : BaseRepository, IPOINPCsRepository
    {
        public POINPCsRepository(IConfiguration configuration) : base(configuration) { }
        private POINPCs NewPOINPCFromReader(SqlDataReader reader)
        {
            return new POINPCs()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                NPCId = reader.GetInt32(reader.GetOrdinal("NPCId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }

        public List<POINPCs> GetPOINPCs()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NPCId, p.POIId
                        FROM POINPCs p
                    ";
                    var reader = cmd.ExecuteReader();

                    var poiNPCs = new List<POINPCs>();

                    while (reader.Read())
                    {
                        poiNPCs.Add(NewPOINPCFromReader(reader));
                    }
                    reader.Close();

                    return poiNPCs;
                }
            }
        }
        public List<POINPCs> GetPOINPCsByPOIId(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NPCId, p.POIId
                        FROM POINPCs p
                        WHERE p.POIId = @poiId
                    ";
                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    var reader = cmd.ExecuteReader();

                    var poiNPCs = new List<POINPCs>();

                    while (reader.Read())
                    {
                        poiNPCs.Add(NewPOINPCFromReader(reader));
                    }
                    reader.Close();

                    return poiNPCs;
                }
            }
        }
        public POINPCs GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NPCId, p.POIId
                        FROM POINPCs p
                        WHERE p.Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    POINPCs poiNPC = null;

                    if (reader.Read())
                    {
                        poiNPC = NewPOINPCFromReader(reader);
                    }
                    reader.Close();

                    return poiNPC;
                }
            }
        }
        public void Add(POINPCs poiNPC)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POINPCs (
                        POIId, NPCId)
                        OUTPUT INSERTED.ID
                        VALUES (@POIId, @NPCId)
                        ";
                    cmd.Parameters.AddWithValue("@POIId", poiNPC.POIId);
                    cmd.Parameters.AddWithValue("@NPCId", poiNPC.NPCId);

                    poiNPC.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POINPCs poiNPC)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using ( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE POINPCs
                        Set POIId = @POIId,
                            NPCId = @NPCId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", poiNPC.Id);
                    cmd.Parameters.AddWithValue("@POIId", poiNPC.POIId);
                    cmd.Parameters.AddWithValue("@NPCId", poiNPC.NPCId);

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
                        DELETE FROM POINPCs
                        WHERE Id = @id";

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
                        DELETE FROM POINPCs
                        WHERE POIId = @poiId";

                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
