defmodule PeopleWeb.PersonControllerTest do
  use PeopleWeb.ConnCase

  import People.NotesFixtures

  alias People.Notes.Person

  @create_attrs %{
    name: "some name",
    notes: "some notes",
    avatar: "some avatar"
  }
  @update_attrs %{
    name: "some updated name",
    notes: "some updated notes",
    avatar: "some updated avatar"
  }
  @invalid_attrs %{name: nil, notes: nil, avatar: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all people", %{conn: conn} do
      conn = get(conn, ~p"/api/people")
      assert json_response(conn, 200) == []
    end
  end

  describe "create person" do
    test "renders person when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/people", @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)

      conn = get(conn, ~p"/api/people/#{id}")

      assert %{
               "id" => ^id,
               "avatar" => "some avatar",
               "name" => "some name",
               "notes" => "some notes"
             } = json_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/people", @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update person" do
    setup [:create_person]

    test "renders person when data is valid", %{conn: conn, person: %Person{id: id} = person} do
      conn = put(conn, ~p"/api/people/#{person}", @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)

      conn = get(conn, ~p"/api/people/#{id}")

      assert %{
               "id" => ^id,
               "avatar" => "some updated avatar",
               "name" => "some updated name",
               "notes" => "some updated notes"
             } = json_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, person: person} do
      conn = put(conn, ~p"/api/people/#{person}", @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete person" do
    setup [:create_person]

    test "deletes chosen person", %{conn: conn, person: person} do
      conn = delete(conn, ~p"/api/people/#{person}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/people/#{person}")
      end
    end
  end

  defp create_person(_) do
    person = person_fixture()
    %{person: person}
  end
end
