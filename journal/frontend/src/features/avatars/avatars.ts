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
import dragonAgeWorld from '../../assets/maps/DragonAgeWorld.jpg'

type ImageSet = 'people' | 'locations'

const people = [
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

const locations = [dragonAgeWorld]

export function chooseDefaultAvatar(id: number, sets: ImageSet = 'locations') {
  const images = sets === 'locations' ? locations : people
  return images[id % images.length]
}
