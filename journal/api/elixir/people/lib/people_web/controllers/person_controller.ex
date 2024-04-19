defmodule PeopleWeb.PersonController do
  use PeopleWeb, :controller

  alias People.Notes
  alias People.Notes.Person

  action_fallback PeopleWeb.FallbackController

  def index(conn, _params) do
    people = Notes.list_people()
    render(conn, :index, people: people)
  end

  def create(conn, %{"person" => person_params}) do
    with {:ok, %Person{} = person} <- Notes.create_person(person_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/people/#{person}")
      |> render(:show, person: person)
    end
  end

  def show(conn, %{"id" => id}) do
    person = Notes.get_person!(id)
    render(conn, :show, person: person)
  end

  def update(conn, %{"id" => id, "person" => person_params}) do
    person = Notes.get_person!(id)

    with {:ok, %Person{} = person} <- Notes.update_person(person, person_params) do
      render(conn, :show, person: person)
    end
  end

  def delete(conn, %{"id" => id}) do
    person = Notes.get_person!(id)

    with {:ok, %Person{}} <- Notes.delete_person(person) do
      send_resp(conn, :no_content, "")
    end
  end
end
