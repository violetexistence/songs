using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dal.Models;

[Table("RelationshipType")]
public partial class RelationshipType {
    [Key]
    public int RelationshipTypeId { get; set; }

    [Required]
    [StringLength(150)]
    public string Name { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }
}
