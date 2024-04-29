using Dal.Models;

namespace WebApi.Persistence
{
    /// <summary>
    /// Tasks for managing locations and their relationships
    /// </summary>
    public interface ILocationRepository
    {
        // Tasks for managing locations
        Task<Location> GetLocation(int id);
        Task<int> AddLocation(Location location);
        Task UpdateLocation(Location location);
        Task DeleteLocation(int id);
        Task<bool> LocationExists(int id);

        //Tasks for managing person locations
        Task<IEnumerable<PersonLocation>> GetPersonLocations();
        Task<int> AddPersonLocation(PersonLocation personLocation);
        Task UpdatePersonLocation(PersonLocation personLocation);
        Task DeletePersonLocation(int id);
        Task<bool> LocationPersonExists(int id);
    }
}