import './App.css'
import { Contacts } from './features/contacts/Contacts'
import { Nav } from './features/nav/Nav'

export function App() {

  return (
    <div className="app">
      <Nav />
      <main>
        <Contacts />
      </main>
    </div>
  )
}