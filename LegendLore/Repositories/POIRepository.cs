using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class POIRepository : BaseRepository, IPOIRepository
    {
        public POIRepository(IConfiguration configuration) : base(configuration) { }

        private POI NewPOIFromReader(SqlDataReader reader)
        {
            return new POI()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }
        public List<POI> GetAllPOIs()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Name, p.Description
                        FROM POI p
                     ";
                    var reader = cmd.ExecuteReader();

                    var POIs = new List<POI>();

                    while (reader.Read())
                    {
                        POIs.Add(NewPOIFromReader(reader));
                    }
                    reader.Close();

                    return POIs;
                }
            }
        }
        public POI GetPOIById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Name, p.Description
                        FROM POI p
                        WHERE p.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    POI singlePOI = null;

                    if (reader.Read())
                    {
                        singlePOI = NewPOIFromReader(reader);
                    }
                    reader.Close();

                    return singlePOI;
                }
            }
        }
        public void Add(POI singlePOI)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO POI (
                        Name, Description )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name, @Description )";
                    cmd.Parameters.AddWithValue("@Name", singlePOI.Name);
                    cmd.Parameters.AddWithValue("@Description", singlePOI.Description);

                    singlePOI.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(POI singlePOI)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE POI
                    SET
                    [Name] = @Name,
                    [Description] = @Description
                    WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", singlePOI.Id);
                    cmd.Parameters.AddWithValue("@Name", singlePOI.Name);
                    cmd.Parameters.AddWithValue("@Description", singlePOI.Description);

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
                        DELETE FROM POI
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
