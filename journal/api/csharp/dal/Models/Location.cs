using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Location
{
    public int LocationId { get; set; }

    public string? Name { get; set; }

    public string? Notes { get; set; }

    public virtual ICollection<PersonLocation> PersonLocations { get; set; } = new List<PersonLocation>();
}
