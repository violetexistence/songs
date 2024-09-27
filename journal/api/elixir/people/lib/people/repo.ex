defmodule People.Repo do
  use Ecto.Repo,
    otp_app: :people,
    adapter: Ecto.Adapters.SQLite3
end
