using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dal.Models;

[Table("Person")]
public partial class Person
{
    [Key]
    public int PersonId { get; set; }

    [Required]
    [StringLength(150)]
    public string Name { get; set; } = null!;

    [StringLength(400)]
    public string? Notes { get; set; }
}
