import logo from '../../assets/logo.svg'
import plus from '../../assets/plus.svg'
import { useContacts } from '../contacts/Contact'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Nav.css'
import { IconButton } from '@mui/material';

export function Nav() {
  const { create } = useContacts()

  return (
    <nav>
      <a href='/'><img src={logo} alt='Journal Home' className='app-logo' /></a>
      <IconButton onClick={create}>
        <AddCircleOutlineIcon />
      </IconButton>
    </nav>
  )
}