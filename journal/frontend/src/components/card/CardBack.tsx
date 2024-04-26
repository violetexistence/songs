import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { PositionedButton } from '../../components/button/PositionedButton'
import { ActiveDropzoneLayer, Dropzone } from '../../components/dnd/Dropzone'

type Props = {
  image: string
  name?: string
  onImageChange?: (newImage: string) => void
  onDelete?: () => void
}

export function CardBack({ image, name, onImageChange, onDelete }: Props) {
  const onDrop = useCallback(
    (image: string) => {
      onImageChange && onImageChange(image)
    },
    [onImageChange]
  )
  const [isConfirmDelete, showConfirmDelete] = useState(false)

  useEffect(() => {
    setTimeout(() => showConfirmDelete(false), 3000)
  }, [isConfirmDelete])

  const handleConfirmDeleteClick = () => {
    onDelete && onDelete()
    showConfirmDelete(false)
  }

  return (
    <Dropzone
      className="avatar"
      onDrop={onDrop}
      style={{
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundImage: `url(${image})`,
      }}
    >
      <h3 className="name">{name}</h3>
      <PositionedButton
        corner="TopRight"
        onClick={() => showConfirmDelete(true)}
      >
        <DeleteTwoToneIcon />
      </PositionedButton>
      {isConfirmDelete && (
        <div className="confirm-delete">
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDeleteClick}
          >
            Confirm Delete
          </Button>
        </div>
      )}
      <ActiveDropzoneLayer>Drop to Update Avatar</ActiveDropzoneLayer>
    </Dropzone>
  )
}
