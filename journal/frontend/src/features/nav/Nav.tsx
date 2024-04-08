import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import logo from '../../assets/logo.svg';
import { usePeople } from '../people/usePeople';
import { useLocations } from '../locations/useLocations';
import './Nav.css';

export function Nav() {
  const createPerson = usePeople().create
  const createLocation = useLocations().create
  const navigate = useNavigate({ from: '/' })

  const isOnPeoplePage = window.location.pathname === '/people';
  const isOnLocationPage = window.location.pathname === '/locations';


  return (
    <nav>
      <a href='/'><img src={logo} alt='Journal Home' className='app-logo' /></a>
      {isOnPeoplePage && (
      <IconButton onClick={() => createPerson({ name: 'New Person' })}>
        <AddCircleOutlineIcon />
      </IconButton>
      )}
      {isOnLocationPage && (
      <IconButton onClick={() => createLocation({ name: 'New Location' })}>
        <AddCircleOutlineIcon />
      </IconButton>
      )}
      <IconButton onClick={() => navigate({ to: '/people' })}>
        <PersonIcon />
      </IconButton>
      <IconButton onClick={() => navigate({ to: '/locations' })}>
        <LocationOnIcon />
      </IconButton>
    </nav>
  )
}