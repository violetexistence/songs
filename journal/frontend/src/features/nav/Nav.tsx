import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import logo from '../../assets/logo.svg';
import { usePeople } from '../people/usePeople';
import './Nav.css';

export function Nav() {
  const { create } = usePeople()

  return (
    <nav>
      <a href='/'><img src={logo} alt='Journal Home' className='app-logo' /></a>
      <IconButton onClick={() => create({ name: 'New Person' })}>
        <AddCircleOutlineIcon />
      </IconButton>
    </nav>
  )
}