import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@tanstack/react-router';
import logo from '../../assets/logo.svg';
import './Nav.css';
import { useNavActions } from './useNavActions';

const pages = [{
  icon: <PersonIcon />,
  to: '/people'
}, {
  icon: <LocationOnIcon />,
  to: '/locations'
}]

export function Nav() {
  const { navActions: actions } = useNavActions()

  return (
    <nav>
      <Link to='/'>
        <img src={logo} alt='Journal Home' className='app-logo' />
      </Link>
      { actions }
      { pages.map(p => {
        return (
          <Link to={p.to} style={{color: 'gray'}} activeProps={{style: { color: 'white' }}}>
            { p.icon }
          </Link>
        )
      })}
    </nav>
  )
}