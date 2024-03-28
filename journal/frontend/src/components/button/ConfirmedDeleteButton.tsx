import { Button } from "@mui/material"
import { useEffect, useState } from "react"

export type ConfirmedDeleteButtonProps = {
  onDelete?: () => void
}

export function ConfirmedDeleteButton({ onDelete }: ConfirmedDeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (showConfirm) {
      setTimeout(() => setShowConfirm(false), 3000)
    }
  },[showConfirm])

  if (showConfirm) {
    return <Button color='error' onClick={onDelete}>Confirm Delete</Button>
  } else {
    return <Button onClick={() => setShowConfirm(true)}>Delete</Button>
  }
}