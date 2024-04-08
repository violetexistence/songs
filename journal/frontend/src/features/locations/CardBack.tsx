import { useCallback, useEffect, useState } from 'react'
import { ActiveDropzoneLayer, Dropzone } from '../../components/dnd/Dropzone'
import { Button } from '@mui/material'
import { PositionedButton } from '../../components/button/PositionedButton'
import { Location } from '../../api/locations'
import { useLocations } from './useLocations'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import dragonAgeWorld from '../../assets/maps/DragonAgeWorld.jpg'


export type BackProps = {
    location: Location
}

export function Back({location}: BackProps) {

    const { update, remove } = useLocations()
    const onDrop = useCallback((backImage: string) => {
        update({
            ...location,
            image: backImage
        })
    }, [])
    const [ isConfirmDelete, showConfirmDelete ] = useState(false)

    const imageUrl = location.image ?? dragonAgeWorld

    useEffect(() => {
        setTimeout(() => showConfirmDelete(false), 3000)
    }, [isConfirmDelete])

    const handleConfirmDeleteClick = () => {
        remove(location.id)
        showConfirmDelete(false)
    }

    return (
        <Dropzone className='avatar' onDrop={onDrop} style={{
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundImage: `url(${imageUrl})`}}>
            <PositionedButton corner='TopRight' onClick={() => showConfirmDelete(true)}>
                <DeleteTwoToneIcon />
            </PositionedButton>
            {isConfirmDelete && (
                <div className='confirm-delete'>
                    <Button variant='contained' color='error' onClick={handleConfirmDeleteClick}>Confirm Delete</Button>
                </div>
            )}
            <ActiveDropzoneLayer>Drop to Update Image</ActiveDropzoneLayer>
        </Dropzone>
    )
}