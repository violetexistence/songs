using Dal.Models;

namespace WebApi.Persistence {
    public class SongsRepository(SongsContext context) : ISongsRepository {
        public Task<IEnumerable<Person>> GetPeople() {
            throw new NotImplementedException();
        }

        public Task<Person> GetPerson(int id) {
            throw new NotImplementedException();
        }

        public Task<int> AddPerson(Person person) {
            throw new NotImplementedException();
        }

        public Task UpdatePerson(Person person) {
            throw new NotImplementedException();
        }

        public Task DeletePerson(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> PersonExists(int id) {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Relationship>> GetRelationships() {
            throw new NotImplementedException();
        }

        public Task<Relationship> GetRelationship(int id) {
            throw new NotImplementedException();
        }

        public Task<int> AddRelationship(Relationship relationship) {
            throw new NotImplementedException();
        }

        public Task UpdateRelationship(Relationship relationship) {
            throw new NotImplementedException();
        }

        public Task DeleteRelationship(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> RelationshipExists(int id) {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<RelationshipType>> GetRelationshipTypes() {
            throw new NotImplementedException();
        }

        public Task<RelationshipType> GetRelationshipType(int id) {
            throw new NotImplementedException();
        }

        public Task<int> AddRelationshipType(RelationshipType relationshipType) {
            throw new NotImplementedException();
        }

        public Task UpdateRelationshipType(RelationshipType relationshipType) {
            throw new NotImplementedException();
        }

        public Task DeleteRelationshipType(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> RelationshipTypeExists(int id) {
            throw new NotImplementedException();
        }
    }
}
