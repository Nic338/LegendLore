using LegendLore.Models;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class MapPOIsRepository : BaseRepository, IMapPOIsRepository
    {
        public MapPOIsRepository(IConfiguration configuration) : base(configuration) { }

        private MapPOIs NewMapPOIFromReader(SqlDataReader reader)
        {
            return new MapPOIs()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Latitude = reader.GetDouble(reader.GetOrdinal("Lat")),
                Longitude = reader.GetDouble(reader.GetOrdinal("Long")),
                MapId = reader.GetInt32(reader.GetOrdinal("MapId")),
                POIId = reader.GetInt32(reader.GetOrdinal("POIId"))
            };
        }
        public List<MapPOIs> GetAllMapPOIs()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.[Coordinates].Lat as Lat, m.[Coordinates].Long as Long, m.MapId, m.POIId
                        FROM MapPOIs m
                    ";
                    var reader = cmd.ExecuteReader();

                    var mapPOIs = new List<MapPOIs>();

                    while (reader.Read())
                    {
                        mapPOIs.Add(NewMapPOIFromReader(reader));
                    }
                    reader.Close();

                    return mapPOIs;
                }
            }
        }
        public List<MapPOIs> GetAllMapPOIsByMapId(int mapId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.[Coordinates].Lat as Lat, m.[Coordinates].Long as Long, m.MapId, m.POIId
                        FROM MapPOIs m
                        WHERE m.MapId = @mapId
                        ";
                    cmd.Parameters.AddWithValue("@mapId", mapId);
                    var reader = cmd.ExecuteReader();

                    var mapPOIs = new List<MapPOIs>();

                    while (reader.Read())
                    {
                        mapPOIs.Add(NewMapPOIFromReader(reader));
                    }
                    reader.Close();

                    return mapPOIs;
                }
            }
        }
        public MapPOIs GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.[Coordinates].Lat as Lat, m.[Coordinates].Long as Long, m.MapId, m.POIId
                        FROM MapPOIs m
                        WHERE m.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    MapPOIs mapPOI = null;

                    if (reader.Read())
                    {
                        mapPOI = NewMapPOIFromReader(reader);
                    }
                    reader.Close();

                    return mapPOI;
                }
            }
        }
        public void Add(MapPOIs mapPOI)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MapPOIs (
                        [Coordinates], POIId, MapId)
                        OUTPUT INSERTED.ID
                        VALUES (geography::Point(@Latitude, @Longitude, 4326), @POIId, @MapId)
                    ";
                    cmd.Parameters.AddWithValue("@Latitude", mapPOI.Latitude);
                    cmd.Parameters.AddWithValue("@Longitude", mapPOI.Longitude);
                    cmd.Parameters.AddWithValue("@POIId", mapPOI.POIId);
                    cmd.Parameters.AddWithValue("@MapId", mapPOI.MapId);

                    mapPOI.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(MapPOIs mapPOI)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MapPOIs
                        SET [Coordinates] = geography::Point(@Latitude, @Longitude, 4326),
                        POIId = @POIId,
                        MapId = @MapId
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", mapPOI.Id);
                    cmd.Parameters.AddWithValue("@Latitude", mapPOI.Latitude);
                    cmd.Parameters.AddWithValue("@Longitude", mapPOI.Longitude);
                    cmd.Parameters.AddWithValue("@POIId", mapPOI.POIId);
                    cmd.Parameters.AddWithValue("@MapId", mapPOI.MapId);

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
                        DELETE FROM MapPOIs
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteAllFromMap(int mapId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM MapPOIs
                        WHERE MapId = @mapId";

                    cmd.Parameters.AddWithValue("@mapId", mapId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
