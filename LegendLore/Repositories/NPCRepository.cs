using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class NPCRepository : BaseRepository, INPCRepository
    {
        public NPCRepository(IConfiguration configuration) : base(configuration) { }

        private NPC NewNPCFromReader(SqlDataReader reader)
        {
            return new NPC()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }
        public List<NPC> GetAllNPCs()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NPC n
                        ";
                    var reader = cmd.ExecuteReader();

                    var NPCs = new List<NPC>();

                    while (reader.Read())
                    {
                        NPCs.Add(NewNPCFromReader(reader));
                    }
                    reader.Close();

                    return NPCs;
                }
            }
        }
        public NPC GetNPCbyId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NPC n
                        WHERE n.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    NPC singleNPC = null;

                    if (reader.Read())
                    {
                        singleNPC = NewNPCFromReader(reader);
                    }
                    reader.Close();

                    return singleNPC;
                }
            }
        }
        public void Add(NPC singleNPC)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO NPC (
                        Name, Description )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Description )";
                    cmd.Parameters.AddWithValue("@Name", singleNPC.Name);
                    cmd.Parameters.AddWithValue("@Description", singleNPC.Description);

                    singleNPC.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(NPC singleNPC)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE NPC
                    SET
                    [Name] = @Name,
                    [Description] = @Description
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", singleNPC.Id);
                    cmd.Parameters.AddWithValue("@Name", singleNPC.Name);
                    cmd.Parameters.AddWithValue("@Description", singleNPC.Description);

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
                        DELETE FROM NPC
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
