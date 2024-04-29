using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Person
{
    public int PersonId { get; set; }

    public string Name { get; set; } = null!;

    public string? Notes { get; set; }

    public virtual ICollection<PersonLocation> PersonLocations { get; set; } = new List<PersonLocation>();

    public virtual ICollection<Relationship> RelationshipFromPeople { get; set; } = new List<Relationship>();

    public virtual ICollection<Relationship> RelationshipToPeople { get; set; } = new List<Relationship>();
}
