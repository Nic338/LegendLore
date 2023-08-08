using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class POINotableLocationsRepository : BaseRepository, IPOINotableLocationsRepository
    {
        public POINotableLocationsRepository(IConfiguration configuration) : base(configuration) { }
        private POINotableLocations NewPOINotableLocationFromReader(SqlDataReader reader)
        {
            return new POINotableLocations()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                NotableLocationId = reader.GetInt32(reader.GetOrdinal("NotableLocationId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }

        public List<POINotableLocations> GetPOINotableLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NotableLocationId, p.POIId
                        FROM POINotableLocations p
                    ";
                    var reader = cmd.ExecuteReader();

                    var poiNotableLocations = new List<POINotableLocations>();

                    while (reader.Read())
                    {
                        poiNotableLocations.Add(NewPOINotableLocationFromReader(reader));
                    }
                    reader.Close();

                    return poiNotableLocations;
                }
            }
        }
        public List<POINotableLocations> GetPOINotableLocationsByPOIId(int poiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NotableLocationId, p.POIId
                        FROM POINotableLocations p
                        WHERE p.POIId = @poiId
                    ";
                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    var reader = cmd.ExecuteReader();

                    var poiNotableLocations = new List<POINotableLocations>();

                    while (reader.Read())
                    {
                        poiNotableLocations.Add(NewPOINotableLocationFromReader(reader));
                    }
                    reader.Close();

                    return poiNotableLocations;
                }
            }
        }
        public POINotableLocations GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.NotableLocationId, p.POIId
                        FROM POINotableLocations p
                        WHERE p.Id = @Id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    var reader = cmd.ExecuteReader();

                    POINotableLocations poiNotableLocation = null;

                    if (reader.Read())
                    {
                        poiNotableLocation = NewPOINotableLocationFromReader(reader);
                    }
                    reader.Close();

                    return poiNotableLocation;
                }
            }
        }
        public void Add(POINotableLocations poiNotableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POINotableLocations (
                        POIId, NotableLocationId)
                        OUTPUT INSERTED.ID
                        VALUES (@POIId, @NotableLocationId)
                        ";
                    cmd.Parameters.AddWithValue("@POIId", poiNotableLocation.POIId);
                    cmd.Parameters.AddWithValue("@NotableLocationId", poiNotableLocation.NotableLocationId);

                    poiNotableLocation.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POINotableLocations poiNotableLocation)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE POINotableLocations
                        Set POIId = @POIId,
                            NoteableLocationId = @NoteableLocationId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", poiNotableLocation.Id);
                    cmd.Parameters.AddWithValue("@POIId", poiNotableLocation.POIId);
                    cmd.Parameters.AddWithValue("@NoteableLocationId", poiNotableLocation.NotableLocationId);

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
                        DELETE FROM POINotableLocations
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
                        DELETE FROM POINotableLocations
                        WHERE POIId = @poiId";

                    cmd.Parameters.AddWithValue("@poiId", poiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
