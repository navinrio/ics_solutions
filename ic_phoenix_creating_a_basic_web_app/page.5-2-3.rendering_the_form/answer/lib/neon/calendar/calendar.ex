defmodule Neon.Calendar do

  alias Neon.Repo
  alias Neon.Calendar.Event

  def list_events do
    Repo.all(Event)
  end

  def get_event(id) do
    Repo.get(Event, id) |> Repo.preload(:comments)
  end

  def change_event(%Event{} = event) do
    Event.changeset(event, %{})    
  end
end
