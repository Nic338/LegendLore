using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class POIQuestsRepository : BaseRepository, IPOIQuestsRepository
    {
        public POIQuestsRepository(IConfiguration configuration) : base(configuration) { }
        private POIQuests NewPOIQuestFromReader(SqlDataReader reader)
        {
            return new POIQuests()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                QuestId = reader.GetInt32(reader.GetOrdinal("QuestId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }

        public List<POIQuests> GetPOIQuests()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.QuestId, p.POIId
                        FROM POIQuests p
                    ";
                    var reader = cmd.ExecuteReader();

                    var poiQuests = new List<POIQuests>();

                    while (reader.Read())
                    {
                        poiQuests.Add(NewPOIQuestFromReader(reader));
                    }
                    reader.Close();

                    return poiQuests;
                }
            }
        }
        public List<POIQuests> GetPOIQuestsByPOIId(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.QuestId, p.POIId
                        FROM POIQuests p
                        WHERE p.POIId = @poiId
                    ";
                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    var reader = cmd.ExecuteReader();

                    var poiQuests = new List<POIQuests>();

                    while (reader.Read())
                    {
                        poiQuests.Add(NewPOIQuestFromReader(reader));
                    }
                    reader.Close();

                    return poiQuests;
                }
            }
        }
        public POIQuests GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.QuestId, p.POIId
                        FROM POIQuests p
                        WHERE p.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    POIQuests poiQuest = null;

                    if (reader.Read())
                    {
                        poiQuest = NewPOIQuestFromReader(reader);
                    }
                    reader.Close();

                    return poiQuest;
                }
            }
        }
        public void Add(POIQuests poiQuest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POIQuests (
                        POIId, QuestId)
                        OUTPUT INSERTED.ID
                        VALUES (@POIId, @QuestId)
                        ";
                    cmd.Parameters.AddWithValue("@POIId", poiQuest.POIId);
                    cmd.Parameters.AddWithValue("@QuestId", poiQuest.QuestId);

                    poiQuest.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POIQuests poiQuest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE POIQuests
                        SET POIId = @POIId,
                            QuestId = @QuestId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", poiQuest.Id);
                    cmd.Parameters.AddWithValue("@POIId", poiQuest.POIId);
                    cmd.Parameters.AddWithValue("@QuestId", poiQuest.QuestId);

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
                        DELETE FROM POIQuests
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
                        DELETE FROM POIQuests
                        WHERE POIId = @POIId
                        ";

                    cmd.Parameters.AddWithValue("@POIId", poiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
