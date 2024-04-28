using Dal.Models;

namespace WebApi.Persistence {
    public interface ISongsRepository {
        // Tasks for managing people
        Task<IEnumerable<Person>> GetPeople();
        Task<Person> GetPerson(int id);
        Task<int> AddPerson(Person person);
        Task UpdatePerson(Person person);
        Task DeletePerson(int id);
        Task<bool> PersonExists(int id);

        //Tasks for managing locations
        Task<Location> GetLocation(int id);
        Task<int> AddLocation(Location location);
        Task UpdateLocation(Location location);
        Task DeleteLocation(int id);
        Task<bool> LocationExists(int id);

        //Tasks for managing relationships
        Task<IEnumerable<Relationship>> GetRelationships();
        Task<Relationship> GetRelationship(int id);
        Task<int> AddRelationship(Relationship relationship);
        Task UpdateRelationship(Relationship relationship);
        Task DeleteRelationship(int id);
        Task<bool> RelationshipExists(int id);

        //Tasks for managing relationship types
        Task<IEnumerable<RelationshipType>> GetRelationshipTypes();
        Task<RelationshipType> GetRelationshipType(int id);
        Task<int> AddRelationshipType(RelationshipType relationshipType);
        Task UpdateRelationshipType(RelationshipType relationshipType);
        Task DeleteRelationshipType(int id);
        Task<bool> RelationshipTypeExists(int id);
    }
}
