# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     People.Repo.insert!(%People.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias People.Repo
alias People.Notes.Person

Repo.insert! %Person{
  name: "Rowan",
  notes: "Arl Rendorn's daughter."
}

Repo.insert! %Person{
  name: "Rendorn Guerrin",
  notes: "The Arl of Redcliffe. Secret rebel."
}

Repo.insert! %Person{
  name: "Fren",
  notes: "Charlotte's childhood friend. A fox."
}

Repo.insert! %Person{
  name: "Marnie",
  notes: "Wife of Fren. A squire."
}
