using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class PersonLocationType
{
    public int PersonLocationTypeId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<PersonLocation> PersonLocations { get; set; } = new List<PersonLocation>();
}
