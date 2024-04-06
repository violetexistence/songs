import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import logo from '../../assets/logo.svg';
import { usePeople } from '../people/usePeople';
import './Nav.css';

export function Nav() {
  const { create } = usePeople()
  const navigate = useNavigate({ from: '/' })

  return (
    <nav>
      <a href='/'><img src={logo} alt='Journal Home' className='app-logo' /></a>
      <IconButton onClick={() => create({ name: 'New Person' })}>
        <AddCircleOutlineIcon />
      </IconButton>
      <IconButton onClick={() => navigate({ to: '/people' })}>
        <PersonIcon />
      </IconButton>
      <IconButton onClick={() => navigate({ to: '/locations' })}>
        <LocationOnIcon />
      </IconButton>
    </nav>
  )
}