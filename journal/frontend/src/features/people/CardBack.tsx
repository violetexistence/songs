import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Person } from '../../api/people'
import avatar1 from '../../assets/avatar1.jpg'
import avatar10 from '../../assets/avatar10.png'
import avatar11 from '../../assets/avatar11.png'
import avatar12 from '../../assets/avatar12.png'
import avatar13 from '../../assets/avatar13.png'
import avatar5 from '../../assets/avatar5.png'
import avatar6 from '../../assets/avatar6.png'
import avatar7 from '../../assets/avatar7.png'
import avatar8 from '../../assets/avatar8.png'
import avatar9 from '../../assets/avatar9.png'
import { PositionedButton } from '../../components/button/PositionedButton'
import { ActiveDropzoneLayer, Dropzone } from '../../components/dnd/Dropzone'
import { usePeople } from './usePeople'

const defaultAvatarList = [
  avatar1,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
]

export type BackProps = {
  person: Person
}

export function Back({ person }: BackProps) {
  const { update, remove } = usePeople()
  const onDrop = useCallback((image: string) => {
    update({
      ...person,
      avatar: image,
    })
  }, [])
  const [isConfirmDelete, showConfirmDelete] = useState(false)

  const defaultAvatar = defaultAvatarList[person.id % defaultAvatarList.length]
  const avatarUrl = person.avatar ?? defaultAvatar

  useEffect(() => {
    setTimeout(() => showConfirmDelete(false), 3000)
  }, [isConfirmDelete])

  const handleConfirmDeleteClick = () => {
    remove(person.id)
    showConfirmDelete(false)
  }

  return (
    <Dropzone
      className="avatar"
      onDrop={onDrop}
      style={{
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundImage: `url(${avatarUrl})`,
      }}
    >
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
