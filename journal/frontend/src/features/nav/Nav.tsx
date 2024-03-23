import logo from '../../assets/logo.svg'
import plus from '../../assets/plus.svg'
import { useContacts } from '../contacts/Contact'
import './Nav.css'

export function Nav() {
  const { create } = useContacts()

  return (
    <nav>
      <a><img src={logo} alt='Journal Home' className='app-logo' /></a>
      <button><img src={plus} alt='add card' onClick={() => create()} /></button>
    </nav>
  )
}