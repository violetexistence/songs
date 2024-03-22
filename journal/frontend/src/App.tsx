import './App.css'
import logo from './assets/logo.svg'
import { Contacts } from './features/contacts/Contacts'

function App() {

  return (
    <div className="App">
      <header className='App-header'>
        <img src={logo} alt='logo' className='App-logo' style={{height: 64}} />
        <h1 className='App-title'>Journal</h1>
      </header>
      <main>
        <Contacts />
      </main>
    </div>
  )
}

export default App
