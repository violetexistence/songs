using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

[PrimaryKey("Person", "Location")]
[Table("PersonLocation")]
public partial class PersonLocation
{
    [Key]
    public int Person { get; set; }

    [Key]
    public int Location { get; set; }

    public int? Type { get; set; }

    [StringLength(500)]
    public string? Notes { get; set; }
}
