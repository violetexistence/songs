using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class PersonLocation
{
    public int PersonLocationId { get; set; }

    public int PersonId { get; set; }

    public int LocationId { get; set; }

    public int? PersonLocationTypeId { get; set; }

    public int? Weight { get; set; }

    public string? Notes { get; set; }

    public virtual Location Location { get; set; } = null!;

    public virtual Person Person { get; set; } = null!;

    public virtual PersonLocationType? PersonLocationType { get; set; }
}
