using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class NoteableLocationRepository : BaseRepository, INoteableLocationRepository
    {
        public NoteableLocationRepository(IConfiguration configuration) : base(configuration) { }

        private NoteableLocation NewNoteableLocationFromReader(SqlDataReader reader)
        {
            return new NoteableLocation()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }
        public List<NoteableLocation> GetAllNoteableLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NoteableLocation n
                    ";
                    var reader = cmd.ExecuteReader();

                    var noteableLocations = new List<NoteableLocation>();

                    while (reader.Read())
                    {
                        noteableLocations.Add(NewNoteableLocationFromReader(reader));
                    }
                    reader.Close();

                    return noteableLocations;
                }
            }
        }
        public NoteableLocation GetNoteableLocationById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT n.Id, n.Name, n.Description
                        FROM NoteableLocation n
                        WHERE n.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    NoteableLocation noteableLocation = null;

                    if (reader.Read())
                    {
                        noteableLocation = NewNoteableLocationFromReader(reader);
                    }
                    reader.Close();

                    return noteableLocation;
                }
            }
        }
        public void Add(NoteableLocation noteableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO NoteableLocation (
                        Name, Description )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Description )";
                    cmd.Parameters.AddWithValue("@Name", noteableLocation.Name);
                    cmd.Parameters.AddWithValue("@Description", noteableLocation.Description);

                    noteableLocation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(NoteableLocation noteableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE NoteableLocation
                    SET
                    [Name] = @Name,
                    [Description] = @Description
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", noteableLocation.Id);
                    cmd.Parameters.AddWithValue("@Name", noteableLocation.Name);
                    cmd.Parameters.AddWithValue("@Description", noteableLocation.Description);
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
                        DELETE FROM NoteableLocation
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
