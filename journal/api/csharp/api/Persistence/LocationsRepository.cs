using Dal.Models;

namespace WebApi.Persistence {
    public class LocationRepository(SongsContext context) : ILocationRepository {
        public Task<Location> GetLocation(int id) {
            throw new NotImplementedException();
        }

        public Task<int> AddLocation(Location location) {
            throw new NotImplementedException();
        }

        public Task UpdateLocation(Location location) {
            throw new NotImplementedException();
        }

        public Task DeleteLocation(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> LocationExists(int id) {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<PersonLocation>> GetPersonLocations() {
            throw new NotImplementedException();
        }

        public Task<int> AddPersonLocation(PersonLocation personLocation) {
            throw new NotImplementedException();
        }

        public Task UpdatePersonLocation(PersonLocation personLocation) {
            throw new NotImplementedException();
        }

        public Task DeletePersonLocation(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> LocationPersonExists(int id) {
            throw new NotImplementedException();
        }
    }
}
