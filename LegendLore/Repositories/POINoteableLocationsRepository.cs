using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class POINoteableLocationsRepository : BaseRepository, IPOINoteableLocationsRepository
    {
        public POINoteableLocationsRepository(IConfiguration configuration) : base(configuration) { }
        private POINoteableLocations NewPOINoteableLocationFromReader(SqlDataReader reader)
        {
            return new POINoteableLocations()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                NoteableLocationId = reader.GetInt32(reader.GetOrdinal("NoteableLocationId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }

        public List<POINoteableLocations> GetPOINoteableLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NoteableLocationId, p.POIId
                        FROM POINoteableLocations p
                    ";
                    var reader = cmd.ExecuteReader();

                    var poiNoteableLocations = new List<POINoteableLocations>();

                    while (reader.Read())
                    {
                        poiNoteableLocations.Add(NewPOINoteableLocationFromReader(reader));
                    }
                    reader.Close();

                    return poiNoteableLocations;
                }
            }
        }
        public List<POINoteableLocations> GetPOINoteableLocationsByPOIId(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NoteableLocationId, p.POIId
                        FROM POINoteableLocations p
                        WHERE p.POIId = @poiId
                    ";
                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    var reader = cmd.ExecuteReader();

                    var poiNoteableLocations = new List<POINoteableLocations>();

                    while (reader.Read())
                    {
                        poiNoteableLocations.Add(NewPOINoteableLocationFromReader(reader));
                    }
                    reader.Close();

                    return poiNoteableLocations;
                }
            }
        }
        public POINoteableLocations GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NoteableLocationId, p.POIId
                        FROM POINoteableLocations p
                        WHERE p.Id = @Id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    POINoteableLocations poiNoteableLocation = null;

                    if (reader.Read())
                    {
                        poiNoteableLocation = NewPOINoteableLocationFromReader(reader);
                    }
                    reader.Close();

                    return poiNoteableLocation;
                }
            }
        }
        public void Add(POINoteableLocations poiNoteableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POINoteableLocations (
                        POIId, NoteableLocationId)
                        OUTPUT INSERTED.ID
                        VALUES (@POIId, @NoteableLocationId)
                        ";
                    cmd.Parameters.AddWithValue("@POIId", poiNoteableLocation.POIId);
                    cmd.Parameters.AddWithValue("@NoteableLocationId", poiNoteableLocation.NoteableLocationId);

                    poiNoteableLocation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POINoteableLocations poiNoteableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE POINoteableLocations
                        Set POIId = @POIId,
                            NoteableLocationId = @NoteableLocationId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", poiNoteableLocation.Id);
                    cmd.Parameters.AddWithValue("@POIId", poiNoteableLocation.POIId);
                    cmd.Parameters.AddWithValue("@NoteableLocationId", poiNoteableLocation.NoteableLocationId);

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
                        DELETE FROM POINoteableLocations
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
                        DELETE FROM POINoteableLocations
                        WHERE POIId = @poiId";

                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
