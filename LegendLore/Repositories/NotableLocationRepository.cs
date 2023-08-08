using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class NotableLocationRepository : BaseRepository, INotableLocationRepository
    {
        public NotableLocationRepository(IConfiguration configuration) : base(configuration) { }

        private NotableLocation NewNotableLocationFromReader(SqlDataReader reader)
        {
            return new NotableLocation()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }
        public List<NotableLocation> GetAllNotableLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NotableLocation n
                    ";
                    var reader = cmd.ExecuteReader();

                    var noteableLocations = new List<NotableLocation>();

                    while (reader.Read())
                    {
                        noteableLocations.Add(NewNotableLocationFromReader(reader));
                    }
                    reader.Close();

                    return noteableLocations;
                }
            }
        }
        public NotableLocation GetNotableLocationById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NotableLocation n
                        WHERE n.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    NotableLocation notableLocation = null;

                    if (reader.Read())
                    {
                        notableLocation = NewNotableLocationFromReader(reader);
                    }
                    reader.Close();

                    return notableLocation;
                }
            }
        }
        public void Add(NotableLocation notableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO NotableLocation (
                        Name, Description )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Description )";
                    cmd.Parameters.AddWithValue("@Name", notableLocation.Name);
                    cmd.Parameters.AddWithValue("@Description", notableLocation.Description);

                    notableLocation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(NotableLocation notableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE NotableLocation
                    SET
                    [Name] = @Name,
                    [Description] = @Description
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", notableLocation.Id);
                    cmd.Parameters.AddWithValue("@Name", notableLocation.Name);
                    cmd.Parameters.AddWithValue("@Description", notableLocation.Description);

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
                        DELETE FROM NotableLocation
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
