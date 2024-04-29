using Dal.Models;

namespace WebApi.Persistence {
    public interface IPeopleRepository {
        // Tasks for managing people
        Task<IEnumerable<Person>> GetPeople();
        Task<Person> GetPerson(int id);
        Task<int> AddPerson(Person person);
        Task UpdatePerson(Person person);
        Task DeletePerson(int id);
        Task<bool> PersonExists(int id);

        //Tasks for managing relationships
        Task<IEnumerable<Relationship>> GetRelationships();
        Task<Relationship> GetRelationship(int id);
        Task<int> AddRelationship(Relationship relationship);
        Task UpdateRelationship(Relationship relationship);
        Task DeleteRelationship(int id);
        Task<bool> RelationshipExists(int id);
    }
}
