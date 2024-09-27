FROM hexpm/elixir:1.16.2-erlang-26.2.4-ubuntu-jammy-20240227

WORKDIR /workspace

RUN apt-get update -y && apt-get install -y git elixir
RUN mix local.hex --force
RUN mix archive.install  --force hex phx_new