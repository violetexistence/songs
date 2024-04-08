import { IconButton } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export type AddButtonProps = {
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <IconButton onClick={onClick}>
      <AddCircleOutlineIcon />
    </IconButton>
  )
}