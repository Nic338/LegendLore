using Microsoft.Data.SqlClient;
using LegendLore.Models;

namespace LegendLore.Repositories
{
    public class CampaignsRepository : BaseRepository, ICampaignsRepository
    {
        public CampaignsRepository(IConfiguration configuration) : base(configuration) { }

        private Campaigns NewCampaignFromReader(SqlDataReader reader)
        {
            return new Campaigns()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                Map = reader.GetString(reader.GetOrdinal("Map")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
            };
        }
        public List<Campaigns> GetAllCampaigns()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Title, c.Description, c.Map, c.CreateDateTime, c.UserProfileId
                        FROM Campaigns c
                        ORDER BY CreateDateTime desc
                        ";
                    var reader = cmd.ExecuteReader();

                    var campaigns = new List<Campaigns>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignFromReader(reader));
                    }
                    reader.Close();

                    return campaigns;
                }
            }
        }
        public List<Campaigns> GetAllCampaignsByUserId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Title, c.Description, c.Map, c.CreateDateTime, c.UserProfileId,
                        FROM Campaigns c
                        WHERE c.UserProfileId = @userProfileId
                        ORDER BY CreateDateTime desc
                    ";
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var campaigns = new List<Campaigns>();

                    while (reader.Read())
                    {
                        campaigns.Add(NewCampaignFromReader(reader));
                    }
                    reader.Close();

                    return campaigns;
                }
            }
        }
        public Campaigns GetCampaignById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Title, c.Description, c.Map, c.CreateDateTime, c.UserProfileId,
                        FROM Campaigns c
                        WHERE c.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Campaigns campaign = null;

                    if (reader.Read())
                    {
                        campaign = NewCampaignFromReader(reader);
                    }
                    reader.Close();

                    return campaign;
                }
            }
        }
        public void Add(Campaigns campaign)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Campaigns ( 
                        Title, Description, CreateDateTime, Map, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Description, @CreateDateTime, @Map, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", campaign.Title);
                    cmd.Parameters.AddWithValue("@Description", campaign.Description);
                    cmd.Parameters.AddWithValue("@CreateDateTime", campaign.CreateDateTime);
                    cmd.Parameters.AddWithValue("@Map", campaign.Map);
                    cmd.Parameters.AddWithValue("@UserProfileId", campaign.UserProfileId);

                    campaign.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Campaigns campaign)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Campaigns
                        SET
                        [Title] = @title,
                         [Description] = @description,
                         [Map] = @map,
                         [CreateDateTime] = @createDateTime,
                         [UserProfileId] = @userProfileId
                        WHERE Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", campaign.Id);
                    cmd.Parameters.AddWithValue("@title", campaign.Title);
                    cmd.Parameters.AddWithValue("@description", campaign.Description);
                    cmd.Parameters.AddWithValue("@createDateTime", campaign.CreateDateTime);
                    cmd.Parameters.AddWithValue("@map", campaign.Map);
                    cmd.Parameters.AddWithValue("@userProfileId", campaign.UserProfileId);

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
                        DELETE FROM Campaigns
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
