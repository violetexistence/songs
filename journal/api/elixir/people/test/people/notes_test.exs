defmodule People.NotesTest do
  use People.DataCase

  alias People.Notes

  describe "people" do
    alias People.Notes.Person

    import People.NotesFixtures

    @invalid_attrs %{name: nil, notes: nil, avatar: nil}

    test "list_people/0 returns all people" do
      person = person_fixture()
      assert Notes.list_people() == [person]
    end

    test "get_person!/1 returns the person with given id" do
      person = person_fixture()
      assert Notes.get_person!(person.id) == person
    end

    test "create_person/1 with valid data creates a person" do
      valid_attrs = %{name: "some name", notes: "some notes", avatar: "some avatar"}

      assert {:ok, %Person{} = person} = Notes.create_person(valid_attrs)
      assert person.name == "some name"
      assert person.notes == "some notes"
      assert person.avatar == "some avatar"
    end

    test "create_person/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Notes.create_person(@invalid_attrs)
    end

    test "update_person/2 with valid data updates the person" do
      person = person_fixture()
      update_attrs = %{name: "some updated name", notes: "some updated notes", avatar: "some updated avatar"}

      assert {:ok, %Person{} = person} = Notes.update_person(person, update_attrs)
      assert person.name == "some updated name"
      assert person.notes == "some updated notes"
      assert person.avatar == "some updated avatar"
    end

    test "update_person/2 with invalid data returns error changeset" do
      person = person_fixture()
      assert {:error, %Ecto.Changeset{}} = Notes.update_person(person, @invalid_attrs)
      assert person == Notes.get_person!(person.id)
    end

    test "delete_person/1 deletes the person" do
      person = person_fixture()
      assert {:ok, %Person{}} = Notes.delete_person(person)
      assert_raise Ecto.NoResultsError, fn -> Notes.get_person!(person.id) end
    end

    test "change_person/1 returns a person changeset" do
      person = person_fixture()
      assert %Ecto.Changeset{} = Notes.change_person(person)
    end
  end
end
