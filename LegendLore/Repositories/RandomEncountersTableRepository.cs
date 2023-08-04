using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class RandomEncountersTableRepository : BaseRepository, IRandomEncountersTableRepository
    {
        public RandomEncountersTableRepository(IConfiguration configuration) : base(configuration) { }

        private RandomEncountersTable NewRandomEncountersTableFromReader(SqlDataReader reader)
        {
            return new RandomEncountersTable()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Encounter = reader.GetString(reader.GetOrdinal("Encounter"))
            };
        }
        public List<RandomEncountersTable> GetAllRandomEncounterTables()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Encounter
                        FROM RandomEncountersTable r
                        ";
                    var reader = cmd.ExecuteReader();

                    var tables = new List<RandomEncountersTable>();

                    while (reader.Read())
                    {
                        tables.Add(NewRandomEncountersTableFromReader(reader));
                    }
                    reader.Close();

                    return tables;
                }
            }
        }
        public RandomEncountersTable GetRandomEncountersTableById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.Encounter
                        FROM RandomEncountersTable r
                        WHERE r.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    RandomEncountersTable table = null;

                    if (reader.Read())
                    {
                        table = NewRandomEncountersTableFromReader(reader);
                    }
                    reader.Close();

                    return table;
                }
            }
        }
        public void Add(RandomEncountersTable table)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO RandomEncountersTable (
                        Encounter )
                        OUTPUT INSERTED.ID
                        VALUES (
                        @Encounter )";
                    cmd.Parameters.AddWithValue("@Encounter", table.Encounter);

                    table.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(RandomEncountersTable table)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE RandomEncountersTable
                        SET
                        [Encounter] = @Encounter
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", table.Id);
                    cmd.Parameters.AddWithValue("@Encounter", table.Encounter);

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
                        DELETE FROM RandomEncountersTable
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
