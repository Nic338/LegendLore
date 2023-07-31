using LegendLore.Models;
using Microsoft.Data.SqlClient;

namespace LegendLore.Repositories
{
    public class MapRepository : BaseRepository, IMapRepository
    {
        public MapRepository(IConfiguration configuration) : base(configuration) { }

        private Map NewMapFromReader(SqlDataReader reader)
        {
            return new Map()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                MapImage = reader.GetString(reader.GetOrdinal("MapImage")),
                CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId"))
            };
        }
        public List<Map> GetAllMapsByCampaignId(int campaignId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.Name, m.MapImage, m.CampaignId
                        FROM Map m
                        WHERE m.CampaignId = @campaignId
                    ";
                    cmd.Parameters.AddWithValue("@campaignId", campaignId);
                    var reader = cmd.ExecuteReader();

                    var maps = new List<Map>();

                    while (reader.Read())
                    {
                        maps.Add(NewMapFromReader(reader));
                    }
                    reader.Close();

                    return maps;
                }
            }
        }
        public Map GetMapById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id, m.Name, m.MapImage, m.CampaignId
                        FROM Map m
                        WHERE m.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Map map = null;

                    if (reader.Read())
                    {
                        map = NewMapFromReader(reader);
                    }
                    reader.Close();

                    return map;
                }
            }
        }
        public void Add(Map map)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Map (
                        Name, MapImage, CampaignId )
                        OUTPUT INSERTED.ID
                        VALUES (
                        @Name, @MapImage, @CampaignId )";
                    cmd.Parameters.AddWithValue("@Name", map.Name);
                    cmd.Parameters.AddWithValue("@MapImage", map.MapImage);
                    cmd.Parameters.AddWithValue("@CampaignId", map.CampaignId);

                    map.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Map map)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Map
                        SET
                        [Name] = @name,
                        [MapImage] = @mapImage,
                        [CampaignId] = @campaignId
                        WHERE Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", map.Id);
                    cmd.Parameters.AddWithValue("@name", map.Name);
                    cmd.Parameters.AddWithValue("@mapImage", map.MapImage);
                    cmd.Parameters.AddWithValue("@campaignId", map.CampaignId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
