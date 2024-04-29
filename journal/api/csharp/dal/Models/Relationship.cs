using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Relationship
{
    public int RelationshipId { get; set; }

    public int FromPersonId { get; set; }

    public int ToPersonId { get; set; }

    public int? RelationshipTypeId { get; set; }

    public int? Weight { get; set; }

    public virtual Person FromPerson { get; set; } = null!;

    public virtual RelationshipType? RelationshipType { get; set; }

    public virtual Person ToPerson { get; set; } = null!;
}
