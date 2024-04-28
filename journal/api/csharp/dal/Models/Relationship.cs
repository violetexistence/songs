using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dal.Models;

[Table("Relationship")]
public partial class Relationship {
    [Key]
    public int RelationshipId { get; set; }

    public int? FromPersonId { get; set; }

    public int? ToPersonId { get; set; }

    public int? Type { get; set; }

    public int? Weight { get; set; }
}
