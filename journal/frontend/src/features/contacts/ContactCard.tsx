import React from "react";
import { Card } from "../../components/card/Card";

export type Contact = {
  id: number
  name: string
  abstract?: string
  avatar?: string
  onDelete?: (id: number) => void
}

export function ContactCard({id, name, abstract, avatar, onDelete}: Contact) {

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDelete && onDelete(id)
    e.stopPropagation()
  }

  return (
    <Card imageUrl={avatar}>
      <h4>{name}</h4>
      <p>{abstract}</p>
      <button onClick={handleDelete}>delete</button>
    </Card>
  )
}