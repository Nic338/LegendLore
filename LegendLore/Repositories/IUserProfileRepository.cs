using LegendLore.Models;

namespace LegendLore.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByEmail(string email);
        void Add(UserProfile userProfile);
        List<UserType> GetUserTypes();
        void UpdateUserType(int userId, int userTypeId);
    }
}
