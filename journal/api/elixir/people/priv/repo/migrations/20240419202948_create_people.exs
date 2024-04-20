defmodule People.Repo.Migrations.CreatePeople do
  use Ecto.Migration

  def change do
    create table(:people) do
      add :name, :string
      add :notes, :string
      add :avatar, :string

      timestamps(type: :utc_datetime)
    end
  end
end
