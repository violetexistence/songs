using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class RelationshipType
{
    public int RelationshipTypeId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Relationship> Relationships { get; set; } = new List<Relationship>();
}
