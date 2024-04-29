using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class SongsContext : DbContext
{
    public SongsContext()
    {
    }

    public SongsContext(DbContextOptions<SongsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<PersonLocation> PersonLocations { get; set; }

    public virtual DbSet<PersonLocationType> PersonLocationTypes { get; set; }

    public virtual DbSet<Relationship> Relationships { get; set; }

    public virtual DbSet<RelationshipType> RelationshipTypes { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Location>(entity =>
        {
            entity.ToTable("Location");

            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Notes).HasMaxLength(400);
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.ToTable("Person");

            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Notes).HasMaxLength(400);
        });

        modelBuilder.Entity<PersonLocation>(entity =>
        {
            entity.ToTable("PersonLocation");

            entity.HasOne(d => d.Location).WithMany(p => p.PersonLocations)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonLocation_Location");

            entity.HasOne(d => d.Person).WithMany(p => p.PersonLocations)
                .HasForeignKey(d => d.PersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PersonLocation_Person");

            entity.HasOne(d => d.PersonLocationType).WithMany(p => p.PersonLocations)
                .HasForeignKey(d => d.PersonLocationTypeId)
                .HasConstraintName("FK_PersonLocation_PersonLocationType");
        });

        modelBuilder.Entity<PersonLocationType>(entity =>
        {
            entity.ToTable("PersonLocationType");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Relationship>(entity =>
        {
            entity.HasKey(e => e.RelationshipId).HasName("PK_Relationshp");

            entity.ToTable("Relationship");

            entity.HasOne(d => d.FromPerson).WithMany(p => p.RelationshipFromPeople)
                .HasForeignKey(d => d.FromPersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Relationship_FromPerson");

            entity.HasOne(d => d.RelationshipType).WithMany(p => p.Relationships)
                .HasForeignKey(d => d.RelationshipTypeId)
                .HasConstraintName("FK_Relationship_RelationshipType");

            entity.HasOne(d => d.ToPerson).WithMany(p => p.RelationshipToPeople)
                .HasForeignKey(d => d.ToPersonId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Relationshp_ToPerson");
        });

        modelBuilder.Entity<RelationshipType>(entity =>
        {
            entity.ToTable("RelationshipType");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(150);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
