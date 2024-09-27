defmodule People.NotesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `People.Notes` context.
  """

  @doc """
  Generate a person.
  """
  def person_fixture(attrs \\ %{}) do
    {:ok, person} =
      attrs
      |> Enum.into(%{
        avatar: "some avatar",
        name: "some name",
        notes: "some notes"
      })
      |> People.Notes.create_person()

    person
  end
end
