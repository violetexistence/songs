using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dal.Models;

[Table("Location")]
public partial class Location {
    [Key]
    public int LocationId { get; set; }

    [StringLength(150)]
    public string? Name { get; set; }

    [StringLength(400)]
    public string? Notes { get; set; }
}
