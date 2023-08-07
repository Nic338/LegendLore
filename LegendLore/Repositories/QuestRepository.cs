using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class QuestRepository : BaseRepository, IQuestRepository
    {
        public QuestRepository(IConfiguration configuration) : base(configuration) { }

        private Quest NewQuestFromReader(SqlDataReader reader)
        {
            return new Quest()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                Reward = reader.GetString(reader.GetOrdinal("Reward"))
            };
        }
        public List<Quest> GetAllQuests()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT q.Id, q.Title, q.Description, q.Reward
                        FROM Quest q
                    ";
                    var reader = cmd.ExecuteReader();

                    var quests = new List<Quest>();

                    while (reader.Read())
                    {
                        quests.Add(NewQuestFromReader(reader));
                    }
                    reader.Close();

                    return quests;
                }
            }
        }
        public Quest GetQuestById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT q.Id, q.Title, q.Description, q.Reward
                        FROM Quest q
                        WHERE q.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Quest quest = null;

                    if (reader.Read())
                    {
                        quest = NewQuestFromReader(reader);
                    }
                    reader.Close();

                    return quest;
                }
            }
        }
        public void Add(Quest quest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Quest (
                        Title, Description, Reward )
                        OUTPUT INSERTED.ID
                        VALUES (
                        @Title, @Description, @Reward )";
                    cmd.Parameters.AddWithValue("@Title", quest.Title);
                    cmd.Parameters.AddWithValue("@Description", quest.Description);
                    cmd.Parameters.AddWithValue("@Reward", quest.Reward);

                    quest.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Quest quest)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Quest
                    SET
                    [Title] = @Title,
                    [Description] = @Description,
                    [Reward] = @Reward
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", quest.Id);
                    cmd.Parameters.AddWithValue("@Title", quest.Title);
                    cmd.Parameters.AddWithValue("@Description", quest.Description);
                    cmd.Parameters.AddWithValue("@Reward", quest.Reward);

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
                    DELETE FROM Quest
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
